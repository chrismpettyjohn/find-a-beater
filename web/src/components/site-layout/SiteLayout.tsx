import { ReactNode } from 'react';
import { VehicleSearch } from '../vehicle-search/VehicleSearch';

export interface SiteLayoutProps {
    children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
    return (
        <>
            <div className="container" style={{ padding: 8 }}>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src="/img/logo.png" alt="Buy a Beater Logo" className="logo" />
                </div>
                <div style={{ width: '100%', marginTop: 12, marginBottom: 18 }}>
                    <VehicleSearch />
                </div>
                {children}
            </div>
            <footer className="footer">
                <p className="footer-text">© 2024 Buy a Beater. All rights reserved.</p>
            </footer>
        </>
    )
}