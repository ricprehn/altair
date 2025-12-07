$courses = @(
    @{
        File        = "c:\Users\Lionking\Documents\antigravity\altair\pages\per.html"
        Name        = "Curso de Patrón de Embarcaciones de Recreo (PER)"
        Description = "Obtén el título oficial de PER. Gobierno de embarcaciones hasta 15m (o 24m) de eslora y navegación hasta 12 millas."
        Credential  = "Título Oficial Patrón de Embarcaciones de Recreo (PER)"
    },
    @{
        File        = "c:\Users\Lionking\Documents\antigravity\altair\pages\pnb.html"
        Name        = "Curso de Patrón de Navegación Básica (PNB)"
        Description = "Título oficial PNB para gobierno de embarcaciones hasta 8m de eslora. Navegación hasta 5 millas de la costa."
        Credential  = "Título Oficial Patrón de Navegación Básica (PNB)"
    },
    @{
        File        = "c:\Users\Lionking\Documents\antigravity\altair\pages\licencia-navegacion.html"
        Name        = "Curso de Licencia de Navegación"
        Description = "Obtén tu Licencia de Navegación (antes Titulín) en solo 6 horas, sin examen. Embarcaciones hasta 6m."
        Credential  = "Licencia de Navegación"
    }
)

foreach ($course in $courses) {
    if (Test-Path $course.File) {
        Write-Host "Injecting Course Schema into $($course.Name)..."
        $content = Get-Content $course.File -Raw -Encoding UTF8

        $schema = @"
    <!-- Schema.org Course Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "$($course.Name)",
      "description": "$($course.Description)",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Escuela Náutica Altair",
        "sameAs": "https://escuelanauticaaltair.com"
      },
      "educationalCredentialAwarded": "$($course.Credential)",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": ["in-person", "online"],
        "courseWorkload": "PT20H" 
      }
    }
    </script>
"@
        
        # Inject before closing head, avoiding duplication
        if ($content -notmatch "@type" + '": "Course"') {
            $content = $content -replace "</head>", "$schema`n</head>"
            Set-Content -Path $course.File -Value $content -Encoding UTF8
        }
    }
}

Write-Host "Course Schemas Applied!"
