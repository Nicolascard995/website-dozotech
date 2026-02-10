export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "name": "Dozo Tech",
                "url": "https://dozo.tech",
                "logo": "https://dozo.tech/logo.png",
                "sameAs": [
                    "https://twitter.com/dozotech",
                    "https://linkedin.com/company/dozotech"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+1-555-0199",
                    "contactType": "customer service",
                    "availableLanguage": ["English", "Spanish", "German"]
                }
            },
            {
                "@type": "Service",
                "name": "Auditoría Remota Gastronómica",
                "provider": {
                    "@type": "Organization",
                    "name": "Dozo Tech"
                },
                "areaServed": "Worldwide",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Restaurant Optimization Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Invisible Customer Radar"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Reservation Shield"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Hidden Money Detector"
                            }
                        }
                    ]
                },
                "description": "Data-driven consulting to optimize restaurant profitability using AI and algorithmic audits."
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
