document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA LEER DATOS DE GOOGLE SHEETS ---
    if (document.title.includes("Ranking")) {
        // Enlace público de tu hoja de cálculo (formato CSV)
        const googleSheetCSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCN9Kcegu7t56R9UNop3YIOAihoqClByfIUQxFVIL8K9GZ2vDB5DDTtvzmB6Kj-sSaLenzaUSAyl7X/pub?output=csv';

        // Función para obtener y mostrar los datos de una hoja específica
        function fetchRankingData(tableBodyId, gid) {
            const sheetURL = `${googleSheetCSV_URL}&gid=${gid}`;
            const tableBody = document.getElementById(tableBodyId);
            
            if (tableBody) {
                tableBody.innerHTML = `<tr><td colspan="4">Cargando ranking...</td></tr>`;
                fetch(sheetURL)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error en la respuesta de la red');
                        }
                        return response.text();
                    })
                    .then(csvText => {
                        tableBody.innerHTML = ""; // Limpiamos la tabla
                        const rows = csvText.trim().split('\n').slice(1); // Omitimos el encabezado
                        
                        rows.forEach(rowText => {
                            const cells = rowText.split(',');
                            if (cells.length >= 4) { // Asegurarnos de que la fila tiene datos
                                const newRow = tableBody.insertRow();
                                newRow.insertCell().textContent = cells[0].trim();
                                newRow.insertCell().textContent = cells[1].trim();
                                newRow.insertCell().textContent = cells[2].trim();
                                newRow.insertCell().textContent = cells[3].trim();
                            }
                        });
                    }).catch(error => {
                        console.error('Error al cargar ranking:', error);
                        tableBody.innerHTML = `<tr><td colspan="4">No se pudo cargar el ranking. Verifica la configuración de publicación de Google Sheets.</td></tr>`;
                    });
            }
        }
        
        // GIDs REALES INSERTADOS
        const gidAsesor = '1865916927';
        const gidRepuestos = '1058654686';
        const gidJefe = '1691736347';
        
        // Llamamos a la función para cada categoría con su GID correspondiente
        fetchRankingData('asesor-body', gidAsesor);
        fetchRankingData('repuestos-body', gidRepuestos);
        fetchRankingData('jefe-body', gidJefe);
    }


    // --- LÓGICA PARA LAS PESTAÑAS (CRITERIOS Y RANKING) ---
    const subNavContainers = document.querySelectorAll('.category-sub-nav');
    if (subNavContainers.length > 0) {
        subNavContainers.forEach(container => {
            const tabs = container.querySelectorAll('a');
            let pageId;
            if (document.title.includes("Ranking")) pageId = 'ranking';
            if (document.title.includes("Criterios")) pageId = 'criterios';
            
            if (pageId) {
                const contentPanels = document.querySelectorAll(`.${pageId}-content`);

                const activateTab = (tab) => {
                    tabs.forEach(t => t.classList.remove('active'));
                    contentPanels.forEach(panel => panel.classList.remove('active'));
                    tab.classList.add('active');
                    const targetPanel = document.querySelector(tab.getAttribute('href'));
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                    }
                };

                tabs.forEach(tab => {
                    tab.addEventListener('click', (event) => {
                        event.preventDefault();
                        activateTab(tab);
                    });
                });

                const hash = window.location.hash;
                let initialTab = tabs[0];
                if (hash && hash.includes(pageId)) {
                    const tabFromHash = container.querySelector(`a[href="${hash}"]`);
                    if (tabFromHash) { initialTab = tabFromHash; }
                }
                if(initialTab) { activateTab(initialTab); }
            }
        });
    }

    // --- LÓGICA PARA EL MENÚ HAMBURGUESA ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('is-active');
        });
    }

    // --- LÓGICA PARA EL ACORDEÓN DE FAQ ---
    const faqQuestions = document.querySelectorAll(".faq-question");
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener("click", () => {
                question.classList.toggle("active");
                const answer = question.nextElementSibling;
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                } else {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } 
            });
        });
    }

    // --- LÓGICA PARA EL CONTADOR REGRESIVO ---
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const targetDate = new Date('Aug 31, 2025 23:59:59').getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById('days').innerText = days;
            document.getElementById('hours').innerText = hours;
            document.getElementById('minutes').innerText = minutes;
            document.getElementById('seconds').innerText = seconds;
            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = `<h2 style="color: #cc0000;">¡EL CONCURSO HA FINALIZADO!</h2>`;
            }
        }, 1000);
    }

    // --- LÓGICA PARA EL BOTÓN DE VOLVER ARRIBA ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        };
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});