export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "name": "Le Sous Chef",
                "url": "https://lesouschef.com",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "hello@lesouschef.com",
                    "contactType": "sales",
                    "availableLanguage": ["English", "Spanish", "German"]
                }
            },
            {
                "@type": "WebSite",
                "name": "Le Sous Chef",
                "url": "https://lesouschef.com",
                "description": "Operations software for independent restaurant kitchens."
            },
            {
                "@type": "SoftwareApplication",
                "name": "Le Sous Chef",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web",
                "description": "Le Sous Chef helps independent kitchens organize recipes, inventory, team routines and core numbers with more operational clarity.",
                "audience": {
                    "@type": "Audience",
                    "audienceType": "Restaurant owners and chef-owners"
                },
                "url": "https://lesouschef.com"
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
