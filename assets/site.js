const downloadableResources = {"viola": [{"href": "risorse/viola-walk-home.zip", "filename": "viola-walk-home.zip", "label": "Presentazione Viola Walk Home", "format": "ZIP (PDF)", "size": "6,7 MB"}], "symbio": [{"href": "risorse/symbio.zip", "filename": "symbio.zip", "label": "Presentazione Symbio", "format": "ZIP (PDF)", "size": "4,7 MB"}, {"href": "risorse/symbio-previsioni-economico-finanziarie.xlsm", "filename": "symbio-previsioni-economico-finanziarie.xlsm", "label": "Previsioni economico-finanziarie", "format": "XLSM", "size": "1,7 MB"}], "toyota": [{"href": "risorse/wetoyota-access.zip", "filename": "wetoyota-access.zip", "label": "Presentazione WeToyota Access", "format": "ZIP (PDF)", "size": "14,7 MB"}], "novanext": [{"href": "risorse/nextpa.zip", "filename": "nextpa.zip", "label": "Presentazione NextPA", "format": "ZIP (PDF)", "size": "13,2 MB"}]};
const projectData = {
  "toyota": {
    "badge": "Top 10 LUMSA & Toyota Headquarter",
    "category": "Loyalty Program · Marketing Strategico",
    "title": "WeToyota Access",
    "context": "Progetto accademico e strategico sviluppato nell'ambito del corso di Marketing Avanzato LUMSA, su commissione diretta di Toyota Motor Italia.",
    "objective": "Ridisegnare il loyalty funnel del marchio nipponico per ingaggiare il segmento Gen Z e giovani professionisti, superando il classico concetto di manutenzione programmata per trasformarlo in un hub di mobilità esperienziale.",
    "role": "Ideazione del concept loyalty, analisi dei customer touchpoint, mappatura della user journey e ideazione dei percorsi di gamification premiante.",
    "result": "Selezionato tra i 10 progetti d'eccellenza dell'Ateneo LUMSA e presentato dal team direttamente presso il quartier generale di Toyota Motor Italia a Roma."
  },
  "novanext": {
    "badge": "B2G Strategic Planning",
    "category": "Business Development · Piano di Innovazione",
    "title": "Novanext – NextPA",
    "context": "Sviluppato all'interno del modulo di Tecnologie e Processi Innovativi per il brand ICT Novanext Training.",
    "objective": "Definire un'efficace roadmap di posizionamento ed espansione per inserire i corsi di alta formazione Novanext all'interno delle gare e dei fabbisogni formativi della Pubblica Amministrazione (PNRR e digital transformation).",
    "role": "Analisi normativa e dei bandi B2G, benchmark competitivo tra fornitori ICT certificati, redazione della Value Proposition per la dirigenza pubblica.",
    "result": "Una proposta di ingresso nel mercato PA, con tempi di go-to-market e percorso di accreditamento. I benefici descritti sono attesi."
  },
  "viola": {
    "badge": "Selezione di ateneo · Make IT A Case 2026",
    "category": "Digital Strategy · Omnichannel Case Study",
    "title": "Viola Walk Home – Strategia Digital 2026",
    "context": "Progetto di marketing multicanale applicato alla celebre startup e applicazione Viola Walk Home, dedicata alla sicurezza stradale e alla prevenzione della violenza.",
    "objective": "Costruire un funnel di acquisizione e retention ad alto tasso etico ed emotivo, valorizzando i canali social (TikTok, Instagram) e le partnership sul territorio per ampliare la community attiva.",
    "role": "Ricerca quantitativa sul target universitario mediante questionari dedicati, sentiment analysis, piano editoriale di brand advocacy e strategia di influencer marketing solidale.",
    "result": "Progetto classificatosi nella Top 3 LUMSA e selezionato quale candidato ufficiale di ateneo per la prestigiosa competizione nazionale Make IT A Case 2026."
  },
  "symbio": {
    "badge": "Circular Economy & Feasibility",
    "category": "Business Strategy · Sostenibilità Rigenerativa",
    "title": "Symbio – Concept & Business Plan",
    "context": "Cattedra di Business Planning e Start-up imprese multimediali.",
    "objective": "Strutturare il Business Model Canvas e il piano finanziario triennale per un format ibrido di ristorazione a chilometro zero e polo museale interattivo sulla biodiversità urbana a Roma.",
    "role": "Elaborazione del Business Model Canvas completo, analisi PESTEL e SWOT, definizione dell'esperienza ospite nel 'dietro le quinte' e strategia di pricing differenziato.",
    "result": "Concept e modello previsionale triennale: la sostenibilità economica e la replicabilità restano da validare sul campo."
  }
};
const dialog = document.getElementById('project-dialog');
const content = document.getElementById('dialog-content');
const routes = {toyota:'wetoyota-access.html',novanext:'novanext-nextpa.html',viola:'viola-walk-home.html',symbio:'symbio.html'};
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.compact-nav').forEach(menu => {
 menu.querySelectorAll('a').forEach(a => a.addEventListener('click',()=>{menu.open=false;}));
 menu.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.open=false;menu.querySelector('summary').focus();}});
});
document.querySelectorAll('[data-carousel-dir]').forEach(button=>{
 button.addEventListener('click',()=>{
  const carousel=document.getElementById('experience-carousel');
  if(!carousel)return;
  const card=carousel.firstElementChild;
  const gap=parseFloat(getComputedStyle(carousel).columnGap)||24;
  carousel.scrollBy({left:((card?.getBoundingClientRect().width||320)+gap)*Number(button.dataset.carouselDir),behavior:reducedMotion.matches?'instant':'smooth'});
 });
});
function appendText(tag,text,className){const node=document.createElement(tag);node.textContent=text;if(className)node.className=className;content.append(node);return node;}
if(dialog && typeof dialog.showModal==='function'){
 document.querySelectorAll('[data-project]').forEach(link=>{
  link.addEventListener('click',event=>{
   if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
   const data=projectData[link.dataset.project];if(!data)return;
   event.preventDefault();content.replaceChildren();
   appendText('p',data.category,'dialog-kicker');
   appendText('h2',data.title).id='dialog-title';
   for(const [label,value] of [['Contesto',data.context],['Obiettivo',data.objective],['Contributo personale',data.role],['Esito del progetto',data.result]]){
    const section=document.createElement('section');section.className='dialog-field';
    const heading=document.createElement('h3');heading.textContent=label;
    const text=document.createElement('p');text.textContent=value;
    section.append(heading,text);content.append(section);
   }
   const details=appendText('a','Leggi il progetto completo ↗','dialog-link');details.href=routes[link.dataset.project];
   const resources = downloadableResources[link.dataset.project] || [];
   if(resources.length){
    const section=document.createElement('section');section.className='dialog-downloads';
    const title=document.createElement('h3');title.textContent='Risorse del progetto';section.append(title);
    for(const item of resources){
     const download=document.createElement('a');download.href=item.href;download.download=item.filename;
     const label=document.createElement('span');label.textContent=item.label+' ↓';
     const meta=document.createElement('small');meta.textContent=item.format+' · '+item.size;
     download.append(label,meta);section.append(download);
    }
    content.append(section);
   }
   dialog.showModal();
  });
 });
 dialog.addEventListener('click',event=>{
  const rect=dialog.getBoundingClientRect();
  if(event.target===dialog && (event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom))dialog.close();
 });
}
