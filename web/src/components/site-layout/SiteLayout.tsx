import { ReactNode } from 'react';

export interface SiteLayoutProps {
    children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
    return (
        <>
            <img src="/img/logo.png" alt="Buy a Beater Logo" className="logo" />
            <div className="container">
                {children}
            </div>
            <footer className="footer">
                <p className="footer-text">© 2024 Buy a Beater. All rights reserved.</p>
            </footer>
        </>
    )
}