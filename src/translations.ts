// translations.js
export const translations = {
  cs: {
    // Hlavička a navigace
    title: 'PPL Widget Wizard',
    step1: 'Výběr typů míst',
    step2: 'Výběr zemí',
    step3: 'Výchozí země/jazyk',
    step4: 'Typ mapy',
    step5: 'Vygenerovaný kód',
    step6: 'Náhled widgetu',

    // Krok 0
    step0: 'Úvodní informace',
    step0Title: 'Vítejte v PPL Widget Wizard',
    step0Description: 'Tento průvodce vám pomůže snadno nakonfigurovat PPL widget pro váš e-shop. Vyplňte prosím následující údaje.',
    step0CustIdLabel: 'Zákaznické číslo (CustId)',
    step0CustIdPlaceholder: '12345678',
    step0CustIdHint: 'Zadejte 8místné zákaznické číslo PPL',
    step0UrlLabel: 'URL vašeho eshopu',
    step0UrlPlaceholder: 'www.vas-eshop.cz',
    step0UrlHint: 'Zadejte URL vašeho eshopu (bez https://)',
    step0InfoTitle: 'Co tento průvodce nabízí?',
    step0Info1: 'Jednoduchá konfigurace PPL widgetu pro váš e-shop',
    step0Info2: 'Výběr typů výdejních míst (ParcelShop, ParcelBox, AlzaBox)',
    step0Info3: 'Podpora pro více zemí a jazyků',
    step0Info4: 'Automatické vygenerování implementačního kódu',
    step0Info5: 'Náhled widgetu před nasazením',
    step0ValidationCustId: 'Zadejte prosím 8místné zákaznické číslo',
    step0ValidationUrl: 'Zadejte prosím URL vašeho eshopu',

    // Krok 1
    step1Title: 'Vyberte typy výdejních míst',
    step1Description:
      'Zvolte, která výdejní místa (ParcelShopy, PPL ParcelBoxy, AlzaBoxy) chcete zobrazit ve widgetu na vašem e-shopu.',
    parcelshop: 'ParcelShop - Výdejní místa PPL',
    parcelbox: 'PPL ParcelBox - Samoobslužné boxy PPL',
    alzabox: 'AlzaBox - Samoobslužné boxy Alza',

    // Krok 2
    step2Title: 'Vyberte dostupné země',
    step2Description:
      'Zvolte, pro které země bude možné ve widgetu vybírat výdejní místa.',
    czechRepublic: 'Česká republika',
    slovakia: 'Slovensko',
    poland: 'Polsko',
    germany: 'Německo',
    netherlands: 'Nizozemsko',
    romania: 'Rumunsko',
    bulgaria: 'Bulharsko',
    hungary: 'Maďarsko',
    austria: 'Rakousko',
    france: 'Francie',
    italy: 'Itálie',
    spain: 'Španělsko',
    portugal: 'Portugalsko',
    slovenia: 'Slovinsko',
    croatia: 'Chorvatsko',
    templatesTitle: 'Šablony pro typy produktů',
    templateNone: 'Vlastní nastavení',
    templateS2Box: 'Smart 2 Box',
    templateS2BoxEurope: 'Smart 2 Box Europe',
    templatesHint:
      'Smart 2 Box produkty jsou určeny k doručení POUZE na výdejní místa typu PPL/DHL ParcelBox (Packstation).',
    tooltipS2Box:
      "Tato šablona automaticky předvybere typ výdejního místa 'PPL Parcelbox' a omezí výběr pouze na Českou republiku. Ideální pro vnitrostátní službu PPL Smart2Box.",
    tooltipS2BoxEurope:
      "Tato šablona automaticky předvybere typ výdejního místa 'DHL Parcelbox/Packstation' a povolí výběr pouze v podporovaných evropských zemích (mimo ČR). Určeno pro mezinárodní doručování do boxů.",

    // Krok 3
    step3Title: 'Nastavte výchozí zobrazení',
    step3Description:
      'Zvolte, která z vybraných zemí se má ve widgetu zobrazit jako první a v jakém jazyce.',
    defaultCountry: 'Výchozí země',
    languageTitle: 'Jazyk widgetu',
    languageDescription: 'Vyberte jazykovou verzi ovládacích prvků widgetu.',
    czech: 'Čeština',
    english: 'Angličtina',
    slovak: 'Slovenština',
    polish: 'Polština',
    german: 'Němčina',
    // Krok 4
    step4Title: 'Vyberte typ mapy',
    step4Description:
      'Zvolte, jaký typ mapy chcete ve widgetu zobrazit a jak se bude chovat.',
    mapDefault:
      'Default - Zobrazuje mapu se všemi funkcionalitami, s tlačítkem Vybrat výdejní místo, které předává data vybraného výdejního místa rodičovské aplikaci ve formě eventu.',
    mapStatic:
      'Static - Zobrazuje statickou mapu s jediným zobrazeným bodem, který je dle dat z API nejblíže definovanému středu mapy. Definice atributů data-lat a data-lng určující střed mapy je v kombinaci s tímto módem velmi doporučeno.',
    mapCatalog:
      'Catalog - Zobrazuje mapu se všemi funkcionalitami, mimo tlačítka Vybrat výdejní místo. Toto použití je vhodné pro uživatele, které chceme primárně směrovat na detaily výdejních míst nasazené na portálu PPL.',
    coordinatesTitle: 'Souřadnice pro statickou mapu',
    coordinatesDescription:
      'Zadejte geografické souřadnice středu mapy. Pro typ Static je to důrazně doporučeno.',
    latitude: 'Zeměpisná šířka (lat):',
    longitude: 'Zeměpisná délka (lng):',
    tooltipDefault:
      'Nejčastější volba pro e-shopy. Umožňuje zákazníkovi vybrat si preferované výdejní místo přímo v košíku.',
    tooltipStatic:
      'Vhodné, pokud chcete zobrazit pouze jedno konkrétní místo (např. vaši pobočku) nebo nejbližší Parcelbox k adrese vaší firmy na kontaktní stránce. Vyžaduje zadání GPS souřadnic.',
    tooltipCatalog:
      'Vhodné pro informační stránky, kde nechcete umožnit výběr místa, ale pouze zobrazit mapu se všemi dostupnými místy (např. stránky "Kde nás najdete").',

    // Krok 5
    step5Title: 'Vygenerovaný kód pro vložení na váš web',
    step5Description:
      'Zkopírujte následující kód a vložte jej do svého eshopu pro zobrazení widgetu PPL výdejních míst s vašimi vlastními nastaveními.',
    headCodeTitle: 'Script pro vložení do hlavičky stránky',
    bodyCodeTitle: 'Kód pro vložení do těla stránky',
    scriptCodeTitle: 'JavaScript kód pro zachycení vybraného místa',
    noteSizeTitle: 'Poznámka:',
    noteSizeText:
      'Pro správné zobrazení widgetu na vašem webu musí být rodičovský element dostatečně široký (minimálně 320px) a vysoký (minimálně 550px). Pro další úpravy a nastavení se podívejte do dokumentace PPL.',
    helpButton: 'Nápověda',
    preview: 'Zobrazit náhled',

    // Krok 6
    step6Title: 'Náhled widgetu',
    step6Description:
      'Zde můžete vidět, jak bude widget vypadat s vašimi nastaveními.',
    reloadPreview: 'Obnovit náhled',
    vmDetailTitle: 'Detail vybraného místa',
    vmType: 'Typ:',
    vmCode: 'Kód:',
    vmName: 'Název:',
    vmAddress: 'Adresa:',
    vmCardPayment: 'Platba kartou:',
    vmOpeningHours: 'Otevírací doba:',

    // Tlačítka
    continue: 'Pokračovat',
    back: 'Zpět',
    changeSettings: 'Změnit nastavení',
    download: 'Stáhnout kód',
    copyHead: 'Zkopírovat kód hlavičky',
    copyBody: 'Zkopírovat kód těla',
    copyScript: 'Zkopírovat JavaScript kód',
    copied: 'Zkopírováno!',

    // Validační hlášky
    selectAtLeastOnePoint: 'Vyberte prosím alespoň jeden typ výdejního místa.',
    selectAtLeastOneCountry: 'Vyberte prosím alespoň jednu zemi.',
    selectDefaultCountry: 'Vyberte prosím výchozí zemi.',
    enterCoordinates:
      'Pro statickou mapu zadejte prosím souřadnice zeměpisné šířky a délky.',
    enterValidCoordinates:
      'Zadejte prosím platné souřadnice v číselném formátu.',

    // Help popup obsah
    headHelpTitle: 'Jak implementovat kód hlavičky',
    headHelpContent: `
      <div class="help-content-block">
        <h4 class="help-content-subtitle">Kam vložit kód hlavičky?</h4>
        <p>Kód hlavičky vložte mezi tagy <code>&lt;head&gt;</code> a <code>&lt;/head&gt;</code> vaší HTML stránky. Tento kód načítá CSS styly a JavaScript potřebné pro správnou funkci widgetu.</p>
        
        <div class="example-structure">
&lt;!DOCTYPE html&gt;
&lt;html lang="cs"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Váš e-shop - Výběr dopravy&lt;/title&gt;
    
    <span class="highlight">&lt;!-- Sem vložte kód hlavičky PPL widgetu --&gt;
    &lt;link rel="stylesheet" href="https://www.ppl.cz/sources/map/main.css"&gt;
    &lt;script type="text/javascript" src="https://www.ppl.cz/sources/map/main.js" async&gt;&lt;/script&gt;</span>
    
    &lt;!-- Další vaše styly a skripty --&gt;
&lt;/head&gt;
&lt;body&gt;
    ...
</div>

        <div class="help-hint">
          <strong>TIP:</strong> Kód hlavičky stačí vložit pouze jednou, i když máte na stránce více widgetů.
        </div>
      </div>
      
      <div class="help-content-block">
        <h4 class="help-content-subtitle">Příklad implementace v redakčním systému</h4>
        <p>Pokud používáte redakční systém (např. WordPress), obvykle můžete vložit kód hlavičky do nastavení:</p>
        <ul>
          <li><strong>WordPress:</strong> Vzhled &gt; Editor motivu &gt; header.php</li>
          <li><strong>Shoptet:</strong> Administrace &gt; Vzhled a obsah &gt; HTML kód &gt; HTML kód v hlavičce</li>
          <li><strong>PrestaShop:</strong> Vzhled &gt; Záhlaví</li>
        </ul>
      </div>
    `,

    bodyHelpTitle: 'Jak implementovat kód těla',
    bodyHelpContent: `
      <div class="help-content-block">
        <h4 class="help-content-subtitle">Kam vložit kód těla?</h4>
        <p>Kód těla vložte na místo, kde chcete zobrazit PPL widget. Typicky to bývá v sekci pro výběr dopravy při pokladně e-shopu nebo na stránce s kontakty.</p>
        
        <div class="example-structure">
&lt;!-- Příklad v košíku e-shopu --&gt;
&lt;div class="shipping-options"&gt;
    &lt;h3&gt;Vyberte způsob dopravy&lt;/h3&gt;
    
    &lt;div class="shipping-option"&gt;
        &lt;input type="radio" id="ppl-parcelshop" name="shipping" value="ppl"&gt;
        &lt;label for="ppl-parcelshop"&gt;PPL Výdejní místo&lt;/label&gt;
    &lt;/div&gt;
    
    &lt;!-- Kontejner pro mapu s definovanou výškou --&gt;
    &lt;div class="ppl-map-container" style="height: 600px; margin: 20px 0;"&gt;
        <span class="highlight">&lt;!-- Sem vložte kód těla PPL widgetu --&gt;
        &lt;div id="ppl-parcelshop-map" data-country="cz" data-countries="cz, sk" data-language="cs" data-mode="default"&gt;&lt;/div&gt;</span>
    &lt;/div&gt;
&lt;/div&gt;
</div>
        
        <div class="help-hint">
          <strong>DŮLEŽITÉ:</strong> Rodičovský element (div), do kterého vkládáte PPL widget, by měl mít definovanou výšku (minimálně 550px) a šířku (minimálně 320px) pro správné zobrazení mapy.
        </div>
      </div>
      
      <div class="help-content-block">
        <h4 class="help-content-subtitle">Možnosti zobrazení</h4>
        <p>Widget můžete zobrazit jako:</p>
        <ul>
          <li><strong>Přímo na stránce</strong> - jak je ukázáno výše</li>
          <li><strong>V modálním okně</strong> - které se otevře po kliknutí na tlačítko</li>
          <li><strong>Na samostatné stránce</strong> - například na stránce "Výdejní místa"</li>
        </ul>
        
        <div class="help-hint">
          <strong>TIP:</strong> Widget můžete skrýt a zobrazit podle potřeby pomocí JavaScriptu. Například když uživatel vybere "PPL dopravu", můžete zobrazit mapu s výdejními místy.
        </div>
      </div>
    `,

    scriptHelpTitle: 'Jak implementovat JavaScript kód',
    scriptHelpContent: `
      <div class="help-content-block">
        <h4 class="help-content-subtitle">Kam vložit JavaScript kód?</h4>
        <p>JavaScript kód vložte na konec těla stránky těsně před uzavírací tag <code>&lt;/body&gt;</code>. Tento kód zachytává událost, když uživatel vybere výdejní místo na mapě.</p>
        
        <div class="example-structure">
    &lt;!-- Obsah stránky --&gt;
    
    &lt;!-- Ostatní skripty --&gt;
    <span class="highlight">&lt;!-- Sem vložte JavaScript kód pro zachycení vybraného místa --&gt;
    &lt;script&gt;
    window.addEventListener('message', function(event) {
        if (event.data && event.data.event === 'pplPickupPointSelected') {
            const selectedPoint = event.data.point;
            console.log('Vybráno výdejní místo:', selectedPoint);
            
            // Zde můžete přidat vlastní kód pro zpracování vybraného místa
            // Například:
            // document.getElementById('shipping-pickup-id').value = selectedPoint.id;
            // document.getElementById('shipping-pickup-name').value = selectedPoint.name;
            // document.getElementById('shipping-pickup-address').value = selectedPoint.address;
        }
    });
    &lt;/script&gt;</span>
&lt;/body&gt;
&lt;/html&gt;
</div>
        
        <div class="help-hint">
          <strong>POZNÁMKA:</strong> Tento kód je potřeba pouze pro widgety v režimu "default", kde chcete zachytit informace o vybraném výdejním místě. Pro režimy "static" nebo "catalog" tento kód nepotřebujete.
        </div>
      </div>
      
      <div class="help-content-block">
        <h4 class="help-content-subtitle">Co obsahuje vybrané výdejní místo?</h4>
        <p>Objekt <code>selectedPoint</code> obsahuje následující informace o vybraném výdejním místě:</p>
        <ul>
          <li><code>id</code> - unikátní identifikátor výdejního místa</li>
          <li><code>name</code> - název výdejního místa</li>
          <li><code>type</code> - typ místa (ParcelShop, ParcelBox, AlzaBox)</li>
          <li><code>street</code> - ulice s číslem popisným</li>
          <li><code>city</code> - město</li>
          <li><code>zip</code> - PSČ</li>
          <li><code>country</code> - země (cz, sk, pl, de)</li>
          <li><code>latitude</code> - zeměpisná šířka</li>
          <li><code>longitude</code> - zeměpisná délka</li>
          <li>a další informace jako otevírací doba, služby, atd.</li>
        </ul>
        
        <div class="help-hint">
          <strong>TIP:</strong> Pro ladění si můžete zobrazit kompletní data výdejního místa pomocí <code>console.log(selectedPoint)</code> a prohlédnout si všechny dostupné informace.
        </div>
      </div>
    `,
  },

  en: {
    // Header and navigation
    title: 'PPL Widget Wizard',
    step1: 'Select pickup point types',
    step2: 'Select countries',
    step3: 'Default country/language',
    step4: 'Map type',
    step5: 'Generated code',
    step6: 'Widget preview',

    // Step 0
    step0: 'Initial Information',
    step0Title: 'Welcome to PPL Widget Wizard',
    step0Description: 'This wizard will help you easily configure the PPL widget for your e-shop. Please fill in the following information.',
    step0CustIdLabel: 'Customer Number (CustId)',
    step0CustIdPlaceholder: '12345678',
    step0CustIdHint: 'Enter your 8-digit PPL customer number',
    step0UrlLabel: 'Your e-shop URL',
    step0UrlPlaceholder: 'www.your-eshop.com',
    step0UrlHint: 'Enter your e-shop URL (without https://)',
    step0InfoTitle: 'What does this wizard offer?',
    step0Info1: 'Easy configuration of PPL widget for your e-shop',
    step0Info2: 'Selection of pickup point types (ParcelShop, ParcelBox, AlzaBox)',
    step0Info3: 'Support for multiple countries and languages',
    step0Info4: 'Automatic generation of implementation code',
    step0Info5: 'Widget preview before deployment',
    step0ValidationCustId: 'Please enter an 8-digit customer number',
    step0ValidationUrl: 'Please enter your e-shop URL',

    // Step 1
    step1Title: 'Select pickup point types to display',
    step1Description:
      'Choose which pickup points will be available in your widget. Non-selected types will be hidden from customers.',
    parcelshop: 'ParcelShop - PPL pickup points',
    parcelbox: 'ParcelBox - PPL boxes for package pickup',
    alzabox: 'AlzaBox - Alza boxes for package pickup',

    // Step 2
    step2Title: 'Select countries to display in the widget',
    step2Description:
      'Choose for which countries it will be possible to select a pickup point in the widget.',
    czechRepublic: 'Czech Republic',
    slovakia: 'Slovakia',
    poland: 'Poland',
    germany: 'Germany',
    netherlands: 'Netherlands',
    romania: 'Romania',
    bulgaria: 'Bulgaria',
    hungary: 'Hungary',
    austria: 'Austria',
    france: 'France',
    italy: 'Italy',
    spain: 'Spain',
    portugal: 'Portugal',
    slovenia: 'Slovenia',
    croatia: 'Croatia',
    templatesTitle: 'Product Type Templates',
    templateNone: 'Custom settings',
    templateS2Box: 'Smart 2 Box',
    templateS2BoxEurope: 'Smart 2 Box Europe',
    emplatesHint:
      'If you are implementing the PPL Smart2Box product in your cart, it is necessary to set up the PPL widget to display only PPL Parcelboxes when this product is selected.',
    tooltipS2Box:
      "This template automatically pre-selects the 'PPL Parcelbox' pickup point type and restricts the selection to the Czech Republic only. Ideal for the domestic PPL Smart2Box service.",
    tooltipS2BoxEurope:
      "This template automatically pre-selects the 'DHL Parcelbox/Packstation' pickup point type and allows selection only in supported European countries (excluding the Czech Republic). Designed for international delivery to parcel boxes.",
    templatesHint:
      'Smart 2 Box products are intended to be delivered ONLY to PPL/DHL ParcelBox (Packstation) pick-up points.',

    // Step 3
    step3Title: 'Select default country and display language',
    step3Description:
      'Choose which country should be displayed first in the widget and which language version will be used.',
    defaultCountry: 'Default country',
    languageTitle: 'Widget language',
    languageDescription: 'Choose the language version of the widget.',
    czech: 'Czech',
    english: 'English',
    slovak: 'Slovak',
    polish: 'Polish',
    german: 'German',

    // Step 4
    step4Title: 'Select map type',
    step4Description:
      'Choose which type of map you want to display in the widget and how it will behave.',
    mapDefault:
      'Default - Displays a map with all functionalities, with a Select pickup point button that passes data of the selected pickup point to the parent application in the form of an event.',
    mapStatic:
      'Static - Displays a static map with a single displayed point, which is according to API data closest to the defined map center. Definition of data-lat and data-lng attributes determining the map center is highly recommended in combination with this mode.',
    mapCatalog:
      'Catalog - Displays a map with all functionalities, except for the Select pickup point button. This use is suitable for users whom we primarily want to direct to the details of pickup points deployed on the PPL portal.',
    coordinatesTitle: 'Coordinates for static map',
    coordinatesDescription:
      'Enter geographic coordinates of the map center. For Static type, this is strongly recommended.',
    latitude: 'Latitude (lat):',
    longitude: 'Longitude (lng):',
    tooltipDefault:
      'Most common choice for e-shops. Allows customers to select their preferred pickup point directly in the cart.',
    tooltipStatic:
      "Suitable if you want to display only one specific location (e.g. your branch) or the nearest Parcelbox to your company's address on the contact page. Requires entering GPS coordinates.",
    tooltipCatalog:
      'Suitable for information pages where you don\'t want to allow location selection, but only display a map with all available places (e.g. "Where to find us" pages).',

    // Step 5
    step5Title: 'Generated code for insertion on your website',
    step5Description:
      'Copy the following code and paste it into your e-shop to display the PPL pickup points widget with your own settings.',
    headCodeTitle: 'Script to insert in the page header',
    bodyCodeTitle: 'Code to insert in the page body',
    scriptCodeTitle: 'JavaScript code to capture the selected point',
    noteSizeTitle: 'Note:',
    noteSizeText:
      'For the correct display of the widget on your website, the parent element must be sufficiently wide (at least 320px) and high (at least 550px). For further adjustments and settings, see the PPL documentation.',
    helpButton: 'Help',
    preview: 'Show preview',

    // Step 6
    step6Title: 'Widget preview',
    step6Description:
      'Here you can see how the widget will look with your settings.',
    reloadPreview: 'Reload preview',
    vmDetailTitle: 'Selected Point Details',
    vmType: 'Type:',
    vmCode: 'Code:',
    vmName: 'Name:',
    vmAddress: 'Address:',
    vmCardPayment: 'Card Payment:',
    vmOpeningHours: 'Opening hours:',

    // Buttons
    continue: 'Continue',
    back: 'Back',
    changeSettings: 'Change settings',
    download: 'Download code',
    copyHead: 'Copy header code',
    copyBody: 'Copy body code',
    copyScript: 'Copy JavaScript code',
    copied: 'Copied!',

    // Validation messages
    selectAtLeastOnePoint: 'Please select at least one pickup point type.',
    selectAtLeastOneCountry: 'Please select at least one country.',
    selectDefaultCountry: 'Please select a default country.',
    enterCoordinates:
      'For static map, please enter the coordinates of latitude and longitude.',
    enterValidCoordinates:
      'Please enter valid coordinates in numerical format.',

    // Help popup obsah
    headHelpTitle: 'How to implement the header code',
    headHelpContent: `
      <div class="help-content-block">
        <h4 class="help-content-subtitle">Where to insert the header code?</h4>
        <p>Insert the header code between the <code>&lt;head&gt;</code> and <code>&lt;/head&gt;</code> tags of your HTML page. This code loads the CSS styles and JavaScript needed for the widget to function properly.</p>
        
        <div class="example-structure">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Your e-shop - Shipping selection&lt;/title&gt;
    
    <span class="highlight">&lt;!-- Insert PPL widget header code here --&gt;
    &lt;link rel="stylesheet" href="https://www.ppl.cz/sources/map/main.css"&gt;
    &lt;script type="text/javascript" src="https://www.ppl.cz/sources/map/main.js" async&gt;&lt;/script&gt;</span>
    
    &lt;!-- Your other styles and scripts --&gt;
&lt;/head&gt;
&lt;body&gt;
    ...
</div>

        <div class="help-hint">
          <strong>TIP:</strong> The header code only needs to be inserted once, even if you have multiple widgets on the page.
        </div>
      </div>
      
      <div class="help-content-block">
        <h4 class="help-content-subtitle">Example implementation in content management systems</h4>
        <p>If you're using a content management system (e.g., WordPress), you can usually insert the header code in the settings:</p>
        <ul>
          <li><strong>WordPress:</strong> Appearance &gt; Theme Editor &gt; header.php</li>
          <li><strong>Shoptet:</strong> Administration &gt; Appearance and content &gt; HTML code &gt; HTML code in header</li>
          <li><strong>PrestaShop:</strong> Appearance &gt; Header</li>
        </ul>
      </div>
    `,

    bodyHelpTitle: 'How to implement the body code',
    bodyHelpContent: `
      <div class="help-content-block">
        <h4 class="help-content-subtitle">Where to insert the body code?</h4>
        <p>Insert the body code at the location where you want to display the PPL widget. This is typically in the shipping selection section at the e-shop checkout or on the contact page.</p>
        
        <div class="example-structure">
&lt;!-- Example in e-shop cart --&gt;
&lt;div class="shipping-options"&gt;
    &lt;h3&gt;Select shipping method&lt;/h3&gt;
    
    &lt;div class="shipping-option"&gt;
        &lt;input type="radio" id="ppl-parcelshop" name="shipping" value="ppl"&gt;
        &lt;label for="ppl-parcelshop"&gt;PPL Pickup point&lt;/label&gt;
    &lt;/div&gt;
    
    &lt;!-- Container for map with defined height --&gt;
    &lt;div class="ppl-map-container" style="height: 600px; margin: 20px 0;"&gt;
        <span class="highlight">&lt;!-- Insert PPL widget body code here --&gt;
        &lt;div id="ppl-parcelshop-map" data-country="cz" data-countries="cz, sk" data-language="en" data-mode="default"&gt;&lt;/div&gt;</span>
    &lt;/div&gt;
&lt;/div&gt;
</div>
        
        <div class="help-hint">
          <strong>IMPORTANT:</strong> The parent element (div) into which you place the PPL widget should have a defined height (minimum 550px) and width (minimum 320px) for proper map display.
        </div>
      </div>
      
      <div class="help-content-block">
        <h4 class="help-content-subtitle">Display options</h4>
        <p>You can display the widget as:</p>
        <ul>
          <li><strong>Directly on the page</strong> - as shown above</li>
          <li><strong>In a modal window</strong> - which opens after clicking a button</li>
          <li><strong>On a separate page</strong> - for example on a "Pickup points" page</li>
        </ul>
        
        <div class="help-hint">
          <strong>TIP:</strong> You can hide and show the widget as needed using JavaScript. For example, when a user selects "PPL delivery", you can display the map with pickup points.
        </div>
      </div>
    `,

    scriptHelpTitle: 'How to implement the JavaScript code',
    scriptHelpContent: `
      <div class="help-content-block">
        <h4 class="help-content-subtitle">Where to insert the JavaScript code?</h4>
        <p>Insert the JavaScript code at the end of the page body just before the closing <code>&lt;/body&gt;</code> tag. This code captures the event when a user selects a pickup point on the map.</p>
        
        <div class="example-structure">
    &lt;!-- Page content --&gt;
    
    &lt;!-- Other scripts --&gt;
    <span class="highlight">&lt;!-- Insert JavaScript code for capturing the selected point here --&gt;
    &lt;script&gt;
    window.addEventListener('message', function(event) {
        if (event.data && event.data.event === 'pplPickupPointSelected') {
            const selectedPoint = event.data.point;
            console.log('Selected pickup point:', selectedPoint);
            
            // Here you can add your own code for processing the selected point
            // For example:
            // document.getElementById('shipping-pickup-id').value = selectedPoint.id;
            // document.getElementById('shipping-pickup-name').value = selectedPoint.name;
            // document.getElementById('shipping-pickup-address').value = selectedPoint.address;
        }
    });
    &lt;/script&gt;</span>
&lt;/body&gt;
&lt;/html&gt;
</div>
        
        <div class="help-hint">
          <strong>NOTE:</strong> This code is only needed for widgets in "default" mode, where you want to capture information about the selected pickup point. For "static" or "catalog" modes, you don't need this code.
        </div>
      </div>
      
      <div class="help-content-block">
        <h4 class="help-content-subtitle">What does the selected pickup point contain?</h4>
        <p>The <code>selectedPoint</code> object contains the following information about the selected pickup point:</p>
        <ul>
          <li><code>id</code> - unique identifier of the pickup point</li>
          <li><code>name</code> - name of the pickup point</li>
          <li><code>type</code> - type of location (ParcelShop, ParcelBox, AlzaBox)</li>
          <li><code>street</code> - street with house number</li>
          <li><code>city</code> - city</li>
          <li><code>zip</code> - ZIP code</li>
          <li><code>country</code> - country (cz, sk, pl, de)</li>
          <li><code>latitude</code> - latitude</li>
          <li><code>longitude</code> - longitude</li>
          <li>and other information such as opening hours, services, etc.</li>
        </ul>
        
        <div class="help-hint">
          <strong>TIP:</strong> For debugging, you can display the complete data of the pickup point using <code>console.log(selectedPoint)</code> and view all available information.
        </div>
      </div>
    `,
  },
};
