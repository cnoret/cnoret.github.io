/*
	Theme (light/dark) and language (EN/FR) toggles.
	English is the text written in index.html; French lives below.
	The initial theme and language are set by the inline script in <head>.
*/

(function() {

	var root = document.documentElement;

	var FR = {
		'meta.description': "Christophe Noret · Data Analyst et Analytics Engineer à Angers / Nantes. Projets data de bout en bout&nbsp;: KPI, prévisions, tableaux de bord.",

		'nav.intro': 'Accueil',
		'nav.about': 'À propos',
		'social.email': 'E-mail',

		'hero.title': 'Les bons chiffres, au bon moment, pour les bonnes personnes.',
		'hero.text': 'Pendant 8 ans, j’ai utilisé les données pour décider sur le terrain. Aujourd’hui, je construis toute la chaîne, des pipelines aux tableaux de bord.',
		'hero.location': 'Angers / Nantes · télétravail possible',
		'hero.cta': 'Me contacter',
		'hero.alt': 'Quatre tableaux de bord de projets&nbsp;: ventes retail, tarification de location de voitures, consommation électrique en France et détection de spam SMS',

		'portfolio.intro': 'Quatre projets, chacun mené du nettoyage des données jusqu’à une application en ligne que vous pouvez tester.',
		'link.demo': 'Démo',

		'p1.title': 'Revue de performance de 45 magasins (Walmart)',
		'p1.desc': 'Un directeur régional doit fixer ses priorités&nbsp;: quels magasins sous-performent, quels rayons soutenir, comment préparer les fêtes&nbsp;? 5&nbsp;recommandations chiffrées, dont 7&nbsp;magasins à auditer pour un potentiel de 139&nbsp;M$ par an. Chaque résultat est recalculé en SQL (DuckDB) et vérifié en CI.',
		'p1.alt': 'Revue de performance de 45 magasins (Walmart)',
		'p2.title': 'Tarification de location de voitures (Getaround)',
		'p2.desc': 'Quel délai imposer entre deux locations&nbsp;? 60&nbsp;minutes éviteraient 77&nbsp;% des conflits de restitution en ne bloquant que 2&nbsp;% des locations. Plus une API de prédiction de prix (MAE 10,68&nbsp;€) livrée avec MLflow, tests et CI.',
		'p2.alt': 'Tarification de location de voitures (Getaround)',
		'p3.title': 'Analyse énergétique en France (Hexa Watts)',
		'p3.desc': 'Projet d’équipe à trois&nbsp;: comment la météo pèse-t-elle sur la consommation électrique des régions&nbsp;? Nous avons croisé 4&nbsp;sources ouvertes (RTE, INSEE, Météo France, Eurostat) dans une application d’analyse et de prévision par région, date et température.',
		'p3.alt': 'Analyse énergétique en France (Hexa Watts)',
		'p4.title': 'Détection de spam SMS',
		'p4.desc': 'Peut-on filtrer les SMS indésirables en temps réel avec un modèle léger&nbsp;? Oui&nbsp;: un réseau de neurones de 598&nbsp;Ko repère 92&nbsp;% des spams (F1&nbsp;0,89), entraîné sur des données déséquilibrées (13&nbsp;% de spams).',
		'p4.alt': 'Détection de spam SMS',

		'about.title': 'À propos',
		'about.p1': 'Après 8 ans en retail à suivre les ventes et les KPI, j’ai choisi la data.',
		'about.p2': 'Aujourd’hui je suis Teaching Assistant data en freelance chez Jedha AI School&nbsp;: j’accompagne les apprenants en SQL, Python et machine learning.',
		'about.p3': 'J’aime construire des pipelines complets et en faire des outils que les gens utilisent vraiment.',
		'about.github': 'Voir mon GitHub',

		'certs.title': 'Formation',
		'certs.degrees': 'Diplômes',
		'certs.d1': 'Titre RNCP niveau 7 (Bac+5) – Architecte en Intelligence Artificielle (Jedha, 2025)',
		'certs.d2': 'Titre RNCP niveau 6 (Bac+3/4) – Concepteur-développeur en science des données (Jedha, 2025)',
		'certs.d3': 'Data Analyst (DataScientest, co-certifié par MINES Paris – PSL, 2023)',
		'certs.online': 'Certifications',

		'fact.retail': 'ans d’expérience métier en retail',
		'fact.cohorts': 'promotions Jedha accompagnées',
		'fact.stack': 'Stack principale',

		'contact.lead': 'Je recherche un poste de Data Analyst ou d’Analytics Engineer à Angers / Nantes ou en télétravail. Parlons-en&nbsp;!',
		'contact.email': 'M’écrire',

		'footer.rights': '&copy; 2026 Christophe Noret. Tous droits réservés.'
	};

	var UI = {
		en: { dark: 'Switch to dark mode', light: 'Switch to light mode', langButton: 'FR', langButtonLang: 'fr', langLabel: 'Voir le site en français' },
		fr: { dark: 'Passer en mode sombre', light: 'Passer en mode clair', langButton: 'EN', langButtonLang: 'en', langLabel: 'View the site in English' }
	};

	// Remember the English text written in the page.
		var EN = {};

		function each(attr, fn) {
			var els = document.querySelectorAll('[' + attr + ']');
			for (var i = 0; i < els.length; i++) fn(els[i], els[i].getAttribute(attr));
		}

		each('data-i18n', function(el, key) { EN[key] = el.innerHTML; });
		each('data-i18n-alt', function(el, key) { EN[key] = el.getAttribute('alt'); });
		each('data-i18n-content', function(el, key) { EN[key] = el.getAttribute('content'); });

	function currentLang() {
		return root.getAttribute('lang') === 'fr' ? 'fr' : 'en';
	}

	function text(lang, key) {
		return (lang === 'fr' && FR[key] !== undefined) ? FR[key] : EN[key];
	}

	// Theme toggle.
		var themeButton = document.getElementById('theme-toggle'),
			themeIcon = themeButton.querySelector('.icon');

		function renderTheme() {
			var dark = root.getAttribute('data-theme') === 'dark',
				label = UI[currentLang()][dark ? 'light' : 'dark'];

			themeIcon.classList.toggle('fa-sun', dark);
			themeIcon.classList.toggle('fa-moon', !dark);
			themeButton.setAttribute('aria-label', label);
			themeButton.setAttribute('title', label);
		}

		themeButton.addEventListener('click', function() {
			var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
			root.setAttribute('data-theme', next);
			try { localStorage.setItem('theme', next); } catch (e) {}
			renderTheme();
		});

	// Language toggle.
		var langButton = document.getElementById('lang-toggle'),
			langLabel = langButton.querySelector('.lang-label');

		function renderLang() {
			var lang = currentLang(),
				ui = UI[lang];

			each('data-i18n', function(el, key) { el.innerHTML = text(lang, key); });
			each('data-i18n-alt', function(el, key) { el.setAttribute('alt', text(lang, key)); });
			each('data-i18n-content', function(el, key) { el.setAttribute('content', text(lang, key)); });

			langLabel.textContent = ui.langButton;
			langLabel.setAttribute('lang', ui.langButtonLang);
			langButton.setAttribute('aria-label', ui.langLabel);
			langButton.setAttribute('title', ui.langLabel);

			renderTheme();
		}

		langButton.addEventListener('click', function() {
			var next = currentLang() === 'fr' ? 'en' : 'fr';
			root.setAttribute('lang', next);
			try { localStorage.setItem('lang', next); } catch (e) {}
			renderLang();
		});

	renderLang();

})();
