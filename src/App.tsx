/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatalogView } from './components/CatalogView';
import { CategoryPageView } from './components/CategoryPageView';
import { FavoritesView } from './components/FavoritesView';
import { SellerDashboard } from './components/SellerDashboard';
import { ProductDetailView } from './components/ProductDetailView';
import { SubscriptionModal } from './components/SubscriptionModal';
import { LocationModal } from './components/LocationModal';
import { NewProductModal } from './components/NewProductModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginModal } from './components/LoginModal';
import { CreateStoreModal } from './components/CreateStoreModal';
import { CartDrawer } from './components/CartDrawer';

const AppContent: React.FC = () => {
  const { activeTab, selectedProduct } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#4A4A4A] selection:bg-[#E8442B] selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Content Areas: Product Screen or Active Tab */}
      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetailView />
        ) : (
          <>
            {activeTab === 'catalog' && <CatalogView />}
            {activeTab === 'category' && <CategoryPageView />}
            {activeTab === 'favorites' && <FavoritesView />}
            {activeTab === 'seller_dashboard' && <SellerDashboard />}
            {activeTab === 'admin_dashboard' && <AdminDashboard />}
          </>
        )}
      </main>

      {/* Footer (exibido apenas no catálogo e páginas públicas) */}
      {activeTab !== 'admin_dashboard' && <Footer />}

      {/* Global Modals (self-contained state & render conditions) */}
      <CartDrawer />
      <SubscriptionModal />
      <LocationModal />
      <NewProductModal />
      <LoginModal />
      <CreateStoreModal />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
