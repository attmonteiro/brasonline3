import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, uploadString, getDownloadURL } from 'firebase/storage';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from 'firebase/auth';
import { db, storage, auth } from '../lib/firebase';
import { Product, Supplier } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialData';

export interface FirebaseStoreData {
  id?: string;
  ownerUid: string;
  nome: string;
  endereco: string;
  contato: string;
  description?: string;
  category?: string;
  logoUrl?: string;
  region?: string;
  updatedAt?: any;
}

export interface FirebaseSubscriptionData {
  userId: string;
  userRole: 'buyer' | 'seller';
  status: 'active' | 'inactive';
  plan: string;
  updatedAt?: any;
}

// ================= FIREBASE STORAGE =================
export async function uploadProductImageToStorage(fileOrDataUrl: File | string, index: number = 0): Promise<string> {
  try {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    
    if (typeof fileOrDataUrl === 'string') {
      if (fileOrDataUrl.startsWith('data:')) {
        const storageRef = ref(storage, `products/${timestamp}_${index}_${randomStr}.jpg`);
        await uploadString(storageRef, fileOrDataUrl, 'data_url');
        return await getDownloadURL(storageRef);
      }
      return fileOrDataUrl; // Already a URL
    } else {
      const storageRef = ref(storage, `products/${timestamp}_${index}_${fileOrDataUrl.name}`);
      await uploadBytes(storageRef, fileOrDataUrl);
      return await getDownloadURL(storageRef);
    }
  } catch (error) {
    console.warn('Firebase Storage upload warning, falling back to local URL/data:', error);
    if (typeof fileOrDataUrl === 'string') return fileOrDataUrl;
    return URL.createObjectURL(fileOrDataUrl);
  }
}

// ================= FIRESTORE PRODUCTS =================
export async function fetchProductsFromFirestore(): Promise<Product[]> {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);

    if (snapshot.empty) {
      console.log('No products in Firestore yet. Seeding initial products...');
      // Seed initial products to Firestore
      const seededProducts: Product[] = [];
      for (const item of INITIAL_PRODUCTS) {
        const docRef = await addDoc(productsRef, {
          title: item.title,
          price: item.price,
          suggestedRetailPrice: item.suggestedRetailPrice || Math.round(item.price * 2.2),
          minQuantity: item.minQuantity || 6,
          category: item.category,
          colors: item.grade?.colors || ['Preto', 'Branco'],
          sizes: item.grade?.sizes || ['P', 'M', 'G', 'GG'],
          images: [item.imageUrl, ...(item.additionalImages || [])],
          loja_id: item.supplier?.id || 'store-01',
          storeName: item.supplier?.name || 'Loja Exemplo',
          region: item.region || 'Brás - SP',
          createdAt: serverTimestamp(),
          createdBy: 'system_seed',
        });
        seededProducts.push({
          ...item,
          id: docRef.id,
        });
      }
      return seededProducts;
    }

    const productsList: Product[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const imagesArr = Array.isArray(data.images) && data.images.length > 0 ? data.images : [data.imageUrl || ''];
      productsList.push({
        id: docSnap.id,
        title: data.title || data.name || 'Produto Sem Nome',
        price: Number(data.price) || 0,
        suggestedRetailPrice: Number(data.suggestedRetailPrice) || Number(data.price) * 2.2,
        minQuantity: Number(data.minQuantity) || 6,
        category: data.category || 'Moda Feminina',
        region: data.region || 'Brás - SP',
        imageUrl: imagesArr[0],
        additionalImages: imagesArr.slice(1),
        description: data.description || 'Peça de confecção própria com preço de atacado.',
        supplier: {
          id: data.loja_id || data.storeId || 'store-01',
          name: data.storeName || 'Fornecedor Atacado',
          storeCode: 'Galeria Brás • Atacado',
          address: 'Brás, São Paulo - SP',
          whatsapp: '5511998887766',
          verified: true,
          region: data.region || 'Brás - SP',
          rating: 5.0,
          totalProducts: 10,
        },
        inStock: true,
        readyDelivery: true,
        grade: {
          sizes: Array.isArray(data.sizes) ? data.sizes : ['P', 'M', 'G', 'GG'],
          colors: Array.isArray(data.colors) ? data.colors : ['Preto', 'Branco'],
          gradeRatio: 'Grade mista',
        },
        createdAt: new Date().toISOString().split('T')[0],
      });
    });

    return productsList;
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return INITIAL_PRODUCTS;
  }
}

export async function saveProductToFirestore(
  productData: {
    name: string;
    price: number;
    suggestedRetailPrice?: number;
    minQuantity: number;
    category: string;
    colors: string[];
    sizes: string[];
    images: (File | string)[];
    storeId: string;
    storeName: string;
    region: string;
  },
  userUid: string
): Promise<{ id: string; imageUrl: string; images: string[] }> {
  // Upload all product photos to Firebase Storage
  const uploadedImageUrls: string[] = [];
  for (let i = 0; i < productData.images.length; i++) {
    const url = await uploadProductImageToStorage(productData.images[i], i);
    uploadedImageUrls.push(url);
  }

  const newDocData = {
    title: productData.name,
    price: Number(productData.price),
    suggestedRetailPrice: Number(productData.suggestedRetailPrice) || Math.round(Number(productData.price) * 2.2),
    minQuantity: Number(productData.minQuantity),
    category: productData.category,
    colors: productData.colors,
    sizes: productData.sizes,
    images: uploadedImageUrls,
    loja_id: productData.storeId,
    storeName: productData.storeName,
    region: productData.region,
    createdAt: serverTimestamp(),
    createdBy: userUid,
  };

  const docRef = await addDoc(collection(db, 'products'), newDocData);

  return {
    id: docRef.id,
    imageUrl: uploadedImageUrls[0] || '',
    images: uploadedImageUrls,
  };
}

export async function deleteProductFromFirestore(productId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    console.error('Error deleting product from Firestore:', error);
  }
}

// ================= FIRESTORE STORES =================
export async function saveStoreToFirestore(storeData: FirebaseStoreData): Promise<void> {
  const storeId = storeData.id || storeData.ownerUid;
  const storeRef = doc(db, 'stores', storeId);
  await setDoc(
    storeRef,
    {
      ownerUid: storeData.ownerUid,
      nome: storeData.nome,
      endereco: storeData.endereco,
      contato: storeData.contato,
      description: storeData.description || '',
      category: storeData.category || 'Moda Feminina',
      logoUrl: storeData.logoUrl || '',
      region: storeData.region || 'Brás - SP',
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function fetchStoreFromFirestore(storeId: string): Promise<FirebaseStoreData | null> {
  try {
    const storeRef = doc(db, 'stores', storeId);
    const docSnap = await getDoc(storeRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ownerUid: data.ownerUid,
        nome: data.nome,
        endereco: data.endereco,
        contato: data.contato,
        description: data.description,
        category: data.category,
        logoUrl: data.logoUrl,
        region: data.region,
      };
    }
    return null;
  } catch (error) {
    console.warn(`Could not read store ${storeId} from Firestore (subscription or rule limit):`, error);
    return null;
  }
}

// ================= FIRESTORE SUBSCRIPTIONS =================
export async function saveSubscriptionToFirestore(
  userId: string,
  userRole: 'buyer' | 'seller',
  status: 'active' | 'inactive',
  plan: string = 'Clube VIP'
): Promise<void> {
  try {
    const subRef = doc(db, 'subscriptions', userId);
    await setDoc(
      subRef,
      {
        userId,
        userRole,
        status,
        plan,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error saving subscription to Firestore:', error);
  }
}

export async function fetchSubscriptionFromFirestore(userId: string): Promise<FirebaseSubscriptionData | null> {
  try {
    const subRef = doc(db, 'subscriptions', userId);
    const docSnap = await getDoc(subRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        userId: data.userId,
        userRole: data.userRole || 'buyer',
        status: data.status || 'inactive',
        plan: data.plan || 'Gratuito',
      };
    }
    return null;
  } catch (error) {
    console.warn('Could not fetch subscription:', error);
    return null;
  }
}

// ================= FIREBASE AUTH =================
export { auth };
