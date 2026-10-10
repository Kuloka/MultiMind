// Shared by static page generation and the browser language switcher.
globalThis.SITE_ORIGIN='https://aetherai-chat.pages.dev';
globalThis.siteLanguagePath=lang=>lang==='en'?'/':'/'+lang+'/';
const searchCopy={
 en:['AetherAI — Local & Cloud AI Chat for Windows, macOS and Linux','Download AetherAI, a desktop AI chat app with local models, OpenRouter, Groq, Gemini, Cerebras and SambaNova. Agents, tools and personal response presets.','Cloud models','Local chat is free. Cloud providers have their own free limits and paid plans. An API key is required for cloud models.'],
 ru:['AetherAI — ИИ-чат для Windows, macOS и Linux','Скачайте AetherAI: приложение для общения с ИИ, локальные модели и облачные OpenRouter, Groq, Gemini, Cerebras и SambaNova. Агенты, инструменты и настройка ответов.','Облачные модели','Локальный чат бесплатный. У облачных провайдеров свои бесплатные лимиты и платные тарифы. Для облачных моделей нужен API-ключ.'],
 es:['AetherAI — Chat de IA para Windows, macOS y Linux','Descarga AetherAI: chat de IA con modelos locales, OpenRouter, Groq, Gemini, Cerebras y SambaNova. Agentes, herramientas y preferencias de respuesta.','Modelos en la nube','El chat local es gratuito. Los proveedores tienen sus propios límites gratuitos y planes de pago. Los modelos en la nube requieren una clave API.'],
 pt:['AetherAI — Chat de IA para Windows, macOS e Linux','Baixe o AetherAI: chat de IA com modelos locais, OpenRouter, Groq, Gemini, Cerebras e SambaNova. Agentes, ferramentas e preferências de resposta.','Modelos na nuvem','O chat local é gratuito. Os provedores têm seus próprios limites gratuitos e planos pagos. Modelos na nuvem exigem uma chave API.'],
 fr:['AetherAI — Chat IA pour Windows, macOS et Linux','Téléchargez AetherAI : chat IA avec modèles locaux, OpenRouter, Groq, Gemini, Cerebras et SambaNova. Agents, outils et préférences de réponse.','Modèles cloud','Le chat local est gratuit. Les fournisseurs ont leurs propres limites gratuites et offres payantes. Les modèles cloud nécessitent une clé API.'],
 de:['AetherAI — KI-Chat für Windows, macOS und Linux','AetherAI herunterladen: KI-Chat mit lokalen Modellen, OpenRouter, Groq, Gemini, Cerebras und SambaNova. Agenten, Werkzeuge und Antwortpräferenzen.','Cloud-Modelle','Lokaler Chat ist kostenlos. Anbieter haben eigene kostenlose Limits und kostenpflichtige Tarife. Cloud-Modelle benötigen einen API-Schlüssel.'],
 it:['AetherAI — Chat IA per Windows, macOS e Linux','Scarica AetherAI: chat IA con modelli locali, OpenRouter, Groq, Gemini, Cerebras e SambaNova. Agenti, strumenti e preferenze di risposta.','Modelli cloud','La chat locale è gratuita. I provider hanno limiti gratuiti e piani a pagamento propri. I modelli cloud richiedono una chiave API.'],
 tr:['AetherAI — Windows, macOS ve Linux için yapay zekâ sohbeti','AetherAI indirin: yerel modeller, OpenRouter, Groq, Gemini, Cerebras ve SambaNova ile yapay zekâ sohbeti. Ajanlar, araçlar ve yanıt tercihleri.','Bulut modelleri','Yerel sohbet ücretsizdir. Sağlayıcıların kendi ücretsiz limitleri ve ücretli planları vardır. Bulut modelleri için API anahtarı gerekir.'],
 pl:['AetherAI — Czat AI dla Windows, macOS i Linux','Pobierz AetherAI: czat AI z modelami lokalnymi, OpenRouter, Groq, Gemini, Cerebras i SambaNova. Agenci, narzędzia i preferencje odpowiedzi.','Modele w chmurze','Czat lokalny jest bezpłatny. Dostawcy mają własne bezpłatne limity i płatne plany. Modele w chmurze wymagają klucza API.'],
 uk:['AetherAI — ШІ-чат для Windows, macOS і Linux','Завантажте AetherAI: застосунок для спілкування з ШІ, локальні моделі та OpenRouter, Groq, Gemini, Cerebras і SambaNova. Агенти, інструменти й налаштування відповідей.','Хмарні моделі','Локальний чат безкоштовний. У хмарних провайдерів власні безкоштовні ліміти й платні тарифи. Для хмарних моделей потрібен API-ключ.']
};
for(const [lang,[title,description,cloud,limits]] of Object.entries(searchCopy)){
 const copy=SITE_COPY[lang];copy.meta=[title,description];copy.hero[4]=description;copy.inside[6]=cloud;
 copy.demos[3]=[cloud,cloud,description,[['OpenRouter','Groq'],['Gemini','Cerebras'],['SambaNova','Ollama Cloud']],limits];
 copy.details[3][0][1]=limits;copy.faq[2][0][1]=limits;
}
// Product copy is separate from search descriptions: explain choices and limits in the scroll story.
const productCopy={
 en:{
  workspace:['One workspace. Your choice of AI.','Chat, work on projects and connect tools in AetherAI. Choose a model on your computer or a cloud provider for each task.','Windows, macOS, Linux · Models and tools in one desktop app'],
  cloud:['You choose where requests go.','Connect your own API key to OpenRouter, Groq, Gemini, Cerebras or SambaNova. Messages and attached context go to the provider you select.','Providers set their own limits and prices · Ollama Cloud is a separate connection'],
  tools:['Tools with your permission.','MCP connects tools; Markdown Skills add instructions. The built-in Workspace reads project text files. Require approval for MCP calls or disable them in planning mode.','You choose the connections and permissions · Skills are instructions, not executable plugins'],
  agents:['See the work. Stay in control.','For suitable tasks, a coordinator assigns up to two specialists. See their models, tasks, status and drafts before the main model combines the answer. Stop cancels active requests.','Extra agents make extra requests · They do not guarantee a faster answer'],
  setup:'For local models, Windows x64 offers Quick setup with a built-in engine; macOS and Linux use Ollama. Cloud models require a separate provider connection.',
  docs:'Read the documentation'
 },
 ru:{
  workspace:['Одно пространство. ИИ на твой выбор.','Общайся с ИИ, работай с проектами и подключай инструменты в AetherAI. Для каждой задачи выбирай модель на компьютере или облачного провайдера.','Windows, macOS, Linux · Модели и инструменты в одном приложении'],
  cloud:['Ты выбираешь, куда идут запросы.','Подключи свой API-ключ OpenRouter, Groq, Gemini, Cerebras или SambaNova. Сообщения и приложенный контекст отправляются выбранному провайдеру.','Лимиты и цены задаёт провайдер · Ollama Cloud подключается отдельно'],
  tools:['Инструменты с твоего разрешения.','MCP подключает инструменты, Markdown Skills добавляют инструкции. Встроенный Workspace читает текстовые файлы проектов. Подтверждай MCP-вызовы или отключай их в режиме планирования.','Ты выбираешь подключения и разрешения · Skills — инструкции, а не исполняемые плагины'],
  agents:['Видишь работу. Управляешь процессом.','Для подходящих задач координатор назначает до двух специалистов. Ты видишь их модели, задачи, статусы и черновики; основная модель объединяет ответ. Остановка отменяет активные запросы.','Дополнительные агенты делают дополнительные запросы · Ускорение не гарантируется'],
  setup:'Для локальных моделей на Windows x64 есть быстрая настройка со встроенным движком; на macOS и Linux используется Ollama. Облачные модели требуют отдельного подключения провайдера.',
  docs:'Читать документацию'
 },
 es:{
  workspace:['Un espacio. Tú eliges la IA.','Conversa con IA, trabaja con proyectos y conecta herramientas en AetherAI. Elige un modelo en tu ordenador o un proveedor en la nube para cada tarea.','Windows, macOS, Linux · Modelos y herramientas en una aplicación'],
  cloud:['Tú eliges dónde van las solicitudes.','Conecta tu clave API de OpenRouter, Groq, Gemini, Cerebras o SambaNova. Los mensajes y el contexto adjunto se envían al proveedor que elijas.','Cada proveedor fija sus límites y precios · Ollama Cloud se conecta por separado'],
  tools:['Herramientas con tu permiso.','MCP conecta herramientas; Markdown Skills añade instrucciones. Workspace lee archivos de texto de tus proyectos. Exige aprobación para llamadas MCP o desactívalas en modo planificación.','Tú eliges conexiones y permisos · Skills son instrucciones, no plugins ejecutables'],
  agents:['Ve el trabajo. Controla el proceso.','Para tareas adecuadas, un coordinador asigna hasta dos especialistas. Ve sus modelos, tareas, estados y borradores; el modelo principal combina la respuesta. Detener cancela las solicitudes activas.','Más agentes hacen más solicitudes · No garantizan una respuesta más rápida'],
  setup:'Para modelos locales, Windows x64 ofrece configuración rápida con motor integrado; macOS y Linux usan Ollama. Los modelos en la nube requieren conectar un proveedor.',
  docs:'Leer la documentación'
 },
 pt:{
  workspace:['Um espaço. Você escolhe a IA.','Converse com IA, trabalhe em projetos e conecte ferramentas no AetherAI. Escolha um modelo no computador ou um provedor na nuvem para cada tarefa.','Windows, macOS, Linux · Modelos e ferramentas em um aplicativo'],
  cloud:['Você escolhe para onde vão as solicitações.','Conecte sua chave API do OpenRouter, Groq, Gemini, Cerebras ou SambaNova. As mensagens e o contexto anexado vão para o provedor escolhido.','Cada provedor define limites e preços · Ollama Cloud é uma conexão separada'],
  tools:['Ferramentas com sua permissão.','MCP conecta ferramentas; Markdown Skills adiciona instruções. Workspace lê arquivos de texto dos projetos. Exija aprovação para chamadas MCP ou desative-as no modo de planejamento.','Você escolhe conexões e permissões · Skills são instruções, não plugins executáveis'],
  agents:['Veja o trabalho. Controle o processo.','Para tarefas adequadas, um coordenador designa até dois especialistas. Veja modelos, tarefas, estados e rascunhos; o modelo principal combina a resposta. Parar cancela solicitações ativas.','Mais agentes fazem mais solicitações · Não garantem uma resposta mais rápida'],
  setup:'Para modelos locais, Windows x64 oferece configuração rápida com motor integrado; macOS e Linux usam Ollama. Modelos na nuvem exigem conectar um provedor.',
  docs:'Ler a documentação'
 },
 fr:{
  workspace:['Un espace. Votre choix d’IA.','Discutez avec l’IA, travaillez sur des projets et connectez des outils dans AetherAI. Choisissez un modèle sur votre ordinateur ou un fournisseur cloud selon la tâche.','Windows, macOS, Linux · Modèles et outils dans une application'],
  cloud:['Vous choisissez où vont les requêtes.','Connectez votre clé API OpenRouter, Groq, Gemini, Cerebras ou SambaNova. Les messages et le contexte joint sont envoyés au fournisseur choisi.','Chaque fournisseur fixe ses limites et tarifs · Ollama Cloud se connecte séparément'],
  tools:['Des outils avec votre accord.','MCP connecte les outils ; Markdown Skills ajoute des instructions. Workspace lit les fichiers texte des projets. Validez les appels MCP ou désactivez-les en mode planification.','Vous choisissez connexions et permissions · Les Skills sont des instructions, pas des plugins exécutables'],
  agents:['Voyez le travail. Gardez le contrôle.','Pour les tâches adaptées, un coordinateur affecte jusqu’à deux spécialistes. Consultez modèles, tâches, états et brouillons ; le modèle principal rassemble la réponse. Arrêter annule les requêtes actives.','Plus d’agents font plus de requêtes · Une réponse plus rapide n’est pas garantie'],
  setup:'Pour les modèles locaux, Windows x64 propose une configuration rapide avec moteur intégré ; macOS et Linux utilisent Ollama. Les modèles cloud nécessitent une connexion à un fournisseur.',
  docs:'Lire la documentation'
 },
 de:{
  workspace:['Ein Arbeitsbereich. Deine KI-Wahl.','Chatte mit KI, arbeite an Projekten und verbinde Werkzeuge in AetherAI. Wähle für jede Aufgabe ein Modell auf deinem Computer oder einen Cloud-Anbieter.','Windows, macOS, Linux · Modelle und Werkzeuge in einer App'],
  cloud:['Du bestimmst das Ziel der Anfragen.','Verbinde deinen API-Schlüssel für OpenRouter, Groq, Gemini, Cerebras oder SambaNova. Nachrichten und angehängter Kontext gehen an den gewählten Anbieter.','Anbieter legen Limits und Preise fest · Ollama Cloud wird separat verbunden'],
  tools:['Werkzeuge mit deiner Erlaubnis.','MCP verbindet Werkzeuge; Markdown Skills ergänzt Anweisungen. Workspace liest Projekttextdateien. Bestätige MCP-Aufrufe oder deaktiviere sie im Planungsmodus.','Du wählst Verbindungen und Rechte · Skills sind Anweisungen, keine ausführbaren Plugins'],
  agents:['Sieh die Arbeit. Behalte die Kontrolle.','Für geeignete Aufgaben beauftragt ein Koordinator bis zu zwei Spezialisten. Sieh Modelle, Aufgaben, Status und Entwürfe; das Hauptmodell führt die Antwort zusammen. Stopp bricht aktive Anfragen ab.','Zusätzliche Agenten stellen zusätzliche Anfragen · Schnellere Antworten sind nicht garantiert'],
  setup:'Für lokale Modelle bietet Windows x64 eine Schnelleinrichtung mit integrierter Engine; macOS und Linux nutzen Ollama. Cloud-Modelle benötigen eine separate Anbieterverbindung.',
  docs:'Dokumentation lesen'
 },
 it:{
  workspace:['Uno spazio. Scegli la tua IA.','Chatta con l’IA, lavora sui progetti e collega strumenti in AetherAI. Scegli un modello sul computer o un provider cloud per ogni attività.','Windows, macOS, Linux · Modelli e strumenti in un’app'],
  cloud:['Scegli dove inviare le richieste.','Collega la tua chiave API di OpenRouter, Groq, Gemini, Cerebras o SambaNova. Messaggi e contesto allegato vanno al provider selezionato.','I provider stabiliscono limiti e prezzi · Ollama Cloud si collega separatamente'],
  tools:['Strumenti con il tuo permesso.','MCP collega strumenti; Markdown Skills aggiunge istruzioni. Workspace legge i file di testo dei progetti. Approva le chiamate MCP o disattivale in modalità pianificazione.','Scegli connessioni e permessi · Le Skills sono istruzioni, non plugin eseguibili'],
  agents:['Vedi il lavoro. Controlla il processo.','Per attività adatte, un coordinatore assegna fino a due specialisti. Vedi modelli, compiti, stati e bozze; il modello principale combina la risposta. Stop annulla le richieste attive.','Più agenti fanno più richieste · Non garantiscono una risposta più rapida'],
  setup:'Per modelli locali, Windows x64 offre configurazione rapida con motore integrato; macOS e Linux usano Ollama. I modelli cloud richiedono una connessione separata al provider.',
  docs:'Leggi la documentazione'
 },
 tr:{
  workspace:['Tek çalışma alanı. Yapay zekâyı sen seç.','AetherAI ile sohbet et, projelerde çalış ve araçları bağla. Her görev için bilgisayarındaki bir modeli veya bulut sağlayıcısını seç.','Windows, macOS, Linux · Modeller ve araçlar tek uygulamada'],
  cloud:['İsteklerin nereye gideceğini sen seç.','OpenRouter, Groq, Gemini, Cerebras veya SambaNova API anahtarını bağla. Mesajlar ve eklenen bağlam seçtiğin sağlayıcıya gönderilir.','Limitleri ve fiyatları sağlayıcı belirler · Ollama Cloud ayrı bağlanır'],
  tools:['Araçlar senin izninle çalışır.','MCP araçları bağlar; Markdown Skills talimat ekler. Workspace proje metin dosyalarını okur. MCP çağrılarını onayla veya planlama modunda kapat.','Bağlantıları ve izinleri sen seçersin · Skills çalıştırılabilir eklentiler değil, talimatlardır'],
  agents:['Çalışmayı gör. Kontrolü koru.','Uygun görevlerde koordinatör en fazla iki uzman görevlendirir. Modelleri, görevleri, durumları ve taslakları gör; ana model yanıtı birleştirir. Durdur etkin istekleri iptal eder.','Ek ajanlar ek istekler yapar · Daha hızlı yanıt garantisi yoktur'],
  setup:'Yerel modeller için Windows x64 yerleşik motorla hızlı kurulum sunar; macOS ve Linux Ollama kullanır. Bulut modelleri ayrı sağlayıcı bağlantısı gerektirir.',
  docs:'Belgeleri oku'
 },
 pl:{
  workspace:['Jedno miejsce. Ty wybierasz AI.','Rozmawiaj z AI, pracuj nad projektami i podłączaj narzędzia w AetherAI. Do każdego zadania wybierz model na komputerze lub dostawcę w chmurze.','Windows, macOS, Linux · Modele i narzędzia w jednej aplikacji'],
  cloud:['Ty wybierasz, dokąd trafiają zapytania.','Podłącz swój klucz API OpenRouter, Groq, Gemini, Cerebras lub SambaNova. Wiadomości i dołączony kontekst trafiają do wybranego dostawcy.','Dostawcy ustalają limity i ceny · Ollama Cloud łączy się osobno'],
  tools:['Narzędzia za Twoją zgodą.','MCP podłącza narzędzia; Markdown Skills dodaje instrukcje. Workspace czyta pliki tekstowe projektów. Zatwierdzaj wywołania MCP lub wyłącz je w trybie planowania.','Wybierasz połączenia i uprawnienia · Skills to instrukcje, nie wykonywalne wtyczki'],
  agents:['Obserwuj pracę. Zachowaj kontrolę.','Przy odpowiednich zadaniach koordynator przydziela do dwóch specjalistów. Zobacz modele, zadania, statusy i szkice; główny model łączy odpowiedź. Stop anuluje aktywne zapytania.','Dodatkowi agenci wykonują dodatkowe zapytania · Szybsza odpowiedź nie jest gwarantowana'],
  setup:'Dla modeli lokalnych Windows x64 oferuje szybką konfigurację z wbudowanym silnikiem; macOS i Linux używają Ollama. Modele w chmurze wymagają osobnego połączenia z dostawcą.',
  docs:'Czytaj dokumentację'
 },
 uk:{
  workspace:['Один простір. ШІ на твій вибір.','Спілкуйся з ШІ, працюй із проєктами й підключай інструменти в AetherAI. Для кожного завдання обирай модель на комп’ютері або хмарного провайдера.','Windows, macOS, Linux · Моделі й інструменти в одному застосунку'],
  cloud:['Ти обираєш, куди йдуть запити.','Підключи свій API-ключ OpenRouter, Groq, Gemini, Cerebras або SambaNova. Повідомлення й доданий контекст надсилаються обраному провайдеру.','Ліміти й ціни визначає провайдер · Ollama Cloud підключається окремо'],
  tools:['Інструменти з твого дозволу.','MCP підключає інструменти, Markdown Skills додають інструкції. Workspace читає текстові файли проєктів. Підтверджуй MCP-виклики або вимикай їх у режимі планування.','Ти обираєш підключення й дозволи · Skills — інструкції, а не виконувані плагіни'],
  agents:['Бачиш роботу. Керуєш процесом.','Для відповідних завдань координатор призначає до двох спеціалістів. Ти бачиш моделі, завдання, статуси й чернетки; основна модель об’єднує відповідь. Зупинка скасовує активні запити.','Додаткові агенти роблять додаткові запити · Прискорення не гарантоване'],
  setup:'Для локальних моделей на Windows x64 є швидке налаштування з вбудованим рушієм; macOS і Linux використовують Ollama. Хмарні моделі потребують окремого підключення провайдера.',
  docs:'Читати документацію'
 }
};
for(const [lang,p] of Object.entries(productCopy)){
 const c=SITE_COPY[lang];
 c.features[3]=[p.workspace,p.tools,p.agents];
 c.demos[3][1]=p.cloud[0];c.demos[3][2]=p.cloud[1];c.demos[3][4]=p.cloud[2];
 c.inside[2]=p.workspace[1];c.download[1]=c.hero[5];c.download[12]=p.setup;
 c.documentation=p.docs;
}

globalThis.siteStructuredData=lang=>{
 const url=SITE_ORIGIN+siteLanguagePath(lang),copy=SITE_COPY[lang];
 return {'@context':'https://schema.org','@graph':[
  {'@type':'WebSite','@id':SITE_ORIGIN+'/#website',url:SITE_ORIGIN+'/',name:'AetherAI',alternateName:['Aether AI','AetherAI Chat'],inLanguage:Object.keys(SITE_LANGUAGES)},
  {'@type':'WebPage','@id':url+'#webpage',url,name:copy.meta[0],description:copy.meta[1],inLanguage:lang,isPartOf:{'@id':SITE_ORIGIN+'/#website'},about:{'@id':SITE_ORIGIN+'/#app'}},
  {'@type':'SoftwareApplication','@id':SITE_ORIGIN+'/#app',name:'AetherAI',url,description:copy.meta[1],applicationCategory:'ProductivityApplication',operatingSystem:'Windows, macOS, Linux',image:SITE_ORIGIN+'/assets/social.png',screenshot:SITE_ORIGIN+'/assets/app.png',offers:{'@type':'Offer',price:'0',priceCurrency:'USD',url:url+'#download'}}
 ]};
};
