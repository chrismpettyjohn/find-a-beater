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
                    <div style={{ width: '50%', minWidth: 200 }}>
                        <VehicleSearch />
                    </div>
                </div>
                {children}
            </div>
            <footer className="footer">
                <p className="footer-text">© 2024 Buy a Beater. All rights reserved.</p>
            </footer>
        </>
    )
}