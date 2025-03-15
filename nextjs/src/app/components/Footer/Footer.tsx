import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-light py-4">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text-muted">
                                © {currentYear} Blog Website . All rights reserved
                            </div>
                            <div className="text-muted">
                                United Arab Emirates, AE (ARE)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

