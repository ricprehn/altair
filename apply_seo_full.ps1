$pagesDir = "c:\Users\Lionking\Documents\antigravity\altair\pages"
$files = Get-ChildItem -Path $pagesDir -Filter "*.html"

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # --- 1. Determine Page Title & Breadcrumb Name ---
    $pageName = $file.BaseName # e.g. "clases-particulares"
    $title = $pageName.Replace("-", " ") 
    $title = (Get-Culture).TextInfo.ToTitleCase($title)

    # Custom mapping for cleaner names
    switch ($pageName) {
        "nosotros" { $title = "Sobre Nosotros" }
        "servicios" { $title = "Servicios" }
        "contact" { $title = "Contacto" }
        "contacto" { $title = "Contacto" }
        "blog" { $title = "Blog" }
        "per" { $title = "Patrón de Embarcaciones de Recreo (PER)" }
        "pnb" { $title = "Patrón de Navegación Básica (PNB)" }
        "licencia-navegacion" { $title = "Licencia de Navegación" }
    }

    # --- 2. JSON-LD Schema (BreadcrumbList) ---
    $schema = @"
    <!-- SEO Schema: BreadcrumbList -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://escuelanauticaaltair.com/index.html"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "$title",
        "item": "https://escuelanauticaaltair.com/pages/$($file.Name)"
      }]
    }
    </script>
"@

    # Inject Schema before closing head
    if ($content -notmatch "BreadcrumbList") {
        $content = $content -replace "</head>", "$schema`n</head>"
    }

    # --- 3. HTML Visual Breadcrumbs ---
    $breadcrumbHtml = @"
    <div class="breadcrumb-container" style="max-width: 1200px; margin: 80px auto 0; padding: 1rem 2rem;">
        <nav aria-label="breadcrumb">
            <ol style="display: flex; list-style: none; padding: 0; margin: 0; font-size: 0.9rem;">
                <li><a href="../index.html" style="color: grey; text-decoration: none;">Inicio</a></li>
                <li style="margin: 0 10px; color: grey;">/</li>
                <li style="color: var(--primary-color, #005c99); font-weight: 500;" aria-current="page">$title</li>
            </ol>
        </nav>
    </div>
"@

    # Inject HTML after Header (assuming standard layout)
    # Avoid duplicate injection
    if ($content -notmatch "breadcrumb-container") {
        $content = $content -replace "</header>", "</header>`n$breadcrumbHtml"
    }

    # Save
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

Write-Host "SEO Optimization Complete!"
