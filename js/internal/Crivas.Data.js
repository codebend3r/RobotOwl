var Crivas = {};

Crivas.Data = {

    menu: [
        {
            id: 0,
            name: 'Portfolio',
            subMenu: true,
            subMenuSelector: '.portfolio-list'
        },
        {
            id: 1,
            name: 'Resume',
            subMenu: false,
            subMenuSelector: ''
        },
	    {
		    id: 2,
		    name: 'Plugins',
		    subMenu: false,
		    subMenuSelector: ''
	    },
        {
            id: 3,
            name: 'Contact',
            subMenu: false,
            subMenuSelector: ''
        }
    ],

    portfolio: {

        summaryText: "<p>Chester Rivas is a highly skilled Front End Developer with many years of experience in both design and development. Chester specializes in various JavaScript frameworks such as: Sproutcore, Knockout.js, Ember.js, which compliment JQuery. Coming from a design background he has the complementary skills of being able to design and animate through code and pickup new frameworks pretty easily.<br/><br/>" +
            "Chester worked at Bell Media on The Movie Network website redesign. Which will be launching soon<br/><br/>" +
            "Recently Chester worked with Jam3 where he worked with several other Senior Front End Developers to put out high-end award winning websites.<br/><br/>" +
            "At Kobo he was a Sproutcore and UI Developer. He helped build Kobo's Instant Reader and Kobo OneStore website redesign.<br/><br/>" +
            "While at Research Now Chester was part of a custom dev team which specialized in eye-catching and highly interactive tools. He developed the global Flash/JavaScript framework that was underneath the hood of all these industry leading market research tools.<br/><br/>" +
            "Chester has been in the industry for 9 years and has worked for many high-end corporate clients and small ad/web agencies. His focus is always quality, design and functionality. Chester is adaptable is comfortable moving at a fast pace.<br/><br/>" +
            "Specialties: JavaScript, JQuery, Knockout.js, Sproutcore, CSS3/SASS, Grunt, Require.js, CodeIgniter, Git, ActionScript 3.0, HTML5, Photoshop.</p>",

        skillset: [
            {
                skillName: 'JavaScript',
                yearsOfExperience: '9',
                levelOfExpertise: 'ADVANCED'
            },
            {
                skillName: 'JQuery',
                yearsOfExperience: '4',
                levelOfExpertise: 'ADVANCED'
            },
            {
                skillName: 'Responsive Web Design (RWD)',
                yearsOfExperience: '2',
                levelOfExpertise: 'EXPERT'
            },
            {
                skillName: 'HTML',
                yearsOfExperience: '9',
                levelOfExpertise: 'EXPERT'
            },
            {
                skillName: 'HTML5',
                yearsOfExperience: '3',
                levelOfExpertise: 'ADVANCED'
            },
            {
                skillName: 'CSS',
                yearsOfExperience: '9',
                levelOfExpertise: 'EXPERT'
            },
            {
                skillName: 'CSS3/SASS',
                yearsOfExperience: '3',
                levelOfExpertise: 'EXPERT'
            },
            {
                skillName: 'Grunt',
                yearsOfExperience: '1',
                levelOfExpertise: 'ADVANCED'
            },
            {
                skillName: 'GitHub',
                yearsOfExperience: '2',
                levelOfExpertise: 'ADVANCED'
            },
            {
                skillName: 'PHP',
                yearsOfExperience: '3',
                levelOfExpertise: 'BASIC'
            },
            {
                skillName: 'ActionScript 3.0/Flash',
                yearsOfExperience: '9',
                levelOfExpertise: 'EXPERT'
            },
            {
                skillName: '.NET',
                yearsOfExperience: '3',
                levelOfExpertise: 'BASIC'
            },
            {
                skillName: 'Knockout.js',
                yearsOfExperience: '3',
                levelOfExpertise: 'ADVANCED'
            },
            {
                skillName: 'Angular.js',
                yearsOfExperience: '1',
                levelOfExpertise: 'BASIC'
            },
            {
                skillName: 'Sproutcore',
                yearsOfExperience: '2',
                levelOfExpertise: 'BASIC'
            },
            {
                skillName: 'RequireJS',
                yearsOfExperience: '1',
                levelOfExpertise: 'ADVANCED'
            },
            {
                skillName: 'Ember.js',
                yearsOfExperience: '1',
                levelOfExpertise: 'BASIC'
            },
            {
                skillName: 'PHP',
                yearsOfExperience: '3',
                levelOfExpertise: 'BASIC'
            },
            {
                skillName: 'ActionScript 3.0/Flash',
                yearsOfExperience: '9',
                levelOfExpertise: 'EXPERT'
            },
            {
                skillName: '.NET',
                yearsOfExperience: '3',
                levelOfExpertise: 'BASIC'
            },
            {
                skillName: 'Adobe Photoshop',
                yearsOfExperience: '9',
                levelOfExpertise: 'ADVANCED'
            },
            {
                skillName: 'Adobe Illustrator',
                yearsOfExperience: '9',
                levelOfExpertise: 'BASIC'
            },
            {
                skillName: 'CodeIgniter',
                yearsOfExperience: '1',
                levelOfExpertise: 'BASIC'
            },
            {
                skillName: 'Facebook Development',
                yearsOfExperience: '3',
                levelOfExpertise: 'BASIC'
            },
            {
                skillName: 'Twitter Development',
                yearsOfExperience: '3',
                levelOfExpertise: 'BASIC'
            }
        ],

        workExperience: [
            {
                id: 28,
                slug: 'countryDeep',
                title: 'Country Deep',
                menuText: 'Country Deep',
                imageURL: [
                    'pages/country_deep_01.jpg',
                    'pages/country_deep_02.jpg',
                    'pages/country_deep_03.jpg',
                    'pages/country_deep_04.jpg'
                ],
                companyName: 'Jam3',
                businessCase: 'New TV station for Country Music.',
                details: 'Allows users to immerse themselves in the country music video experience. Users can submit videos via webcam and Instagram with specific hashtags. Their videos will dynamically be added to the remix section. You can also lip sync while recording yourself on the webcam',
                techUsed: 'RequireJS, JavaScript, PHP, Grunt, JQuery, CSS3, LESS, HTML5, Proprietary Framework (Jam3)',
                url: 'http://countrydeepletscruise.com',
                active: true
            },
            {
                id: 27,
                slug: 'justEat',
                title: 'Just Eat - Chomp Chomp Chomp',
                menuText: 'Just Eat',
                imageURL: [
                    'pages/justeat-01.jpg',
                    'pages/justeat-02.jpg',
                    'pages/justeat-03-a.jpg',
                    'pages/justeat-03-b.jpg',
                    'pages/justeat-04.jpg'
                ],
                companyName: 'Jam3',
                businessCase: 'A website for select Canadian Universities for students to enter the Just-Eat.ca contest for a chance to win food!',
                details: 'Built with CodeIgniter, this website has a set of different phases program to change automatically at certain times',
                techUsed: 'CodeIgniter, Grunt, JQuery, CSS3, SASS, JavaScript, HTML5',
                url: 'http://chompchompchomp.ca',
                active: true
            },
            {
                id: 26,
                slug: 'monde',
                title: 'Monde',
                menuText: 'Monde Condos',
                imageURL: [
                    'pages/monde-01.jpg',
                    'pages/monde-02.jpg'
                ],
                companyName: 'Great Gulf',
                businessCase: 'Potential home buyers need a way to search and find deals on condos. Potential clients can also view pics and browse floorplans.',
                details: 'A website showcasing all of Monde Condos',
                techUsed: 'JavaScript, PHP, HTML5, Grunt, JQuery, CSS3, SASS',
                url: 'http://www.mondecondominiums.com/',
                active: true
            },
            {
                id: 25,
                slug: 'revolutionMovie',
                title: 'Revolution Movie',
                menuText: 'Revolution Movie',
                imageURL: [
                    'pages/rev_1.jpg',
                    'pages/rev_2.jpg',
                    'pages/rev_3.jpg',
                    'pages/rev_4.jpg',
                    'pages/rev_5.jpg'
                ],
                companyName: 'Contract',
                businessCase: 'A complete responsive website with breakpoints for mobile phones and tablets.',
                details: 'This website was built with Knockout.js. Knockout.js was used in conjunction with JSON to store all the data. Custom built deep linking framework',
                techUsed: 'Knockout.js, Grunt, JQuery, CSS3, SASS, JavaScript, HTML5',
                url: 'http://crivas.net/portfolio/motionseason/revolution',
                //url: 'http://revolution.motionseason.com/',
                active: true
            },
            {
                id: 24,
                slug: 'koboInstantReader',
                title: 'Kobo Instant Reader',
                menuText: 'Kobo Instant Reader',
                imageURL: [
                    'pages/kobo_instant_reader_page_1.jpg',
                    'pages/kobo_instant_reader_page_2.jpg'
                ],
                companyName: 'Kobo Inc.',
                businessCase: 'An HTML5 solution for reading Kobo eBooks on any device at any time.',
                details: 'With Kobo Instant Reader you can read books on Desktop, Tablet, Smartphones. This web app has the ability to purchase and download books for offline reading, and syncs with other Kobo apps.',
                techUsed: 'Sproutcore, CSS3, SASS, JavaScript, HTML5',
                url: 'http://read.kobobooks.com',
                active: true
            },
            {
                id: 23,
                slug: 'koboWebsite',
                title: 'Kobo Website',
                menuText: 'Kobo Website',
                imageURL: [
                    'pages/kobo-1.jpg',
                    'pages/kobo-2.jpg',
                    'pages/kobo-3.jpg',
                    'pages/kobo-4.jpg',
                    'pages/kobo-5.jpg'
                ],
                companyName: 'Kobo Inc.',
                businessCase: 'Kobo decided they need a complete web design from the ground up. The idea was to consolidate all sites into one website called One Store.',
                details: 'This is completely responsive designed optimized to 3 views: small, medium, large. Extensive work was required to setup a custom JavaScript framework. We integrated Knockout.js UI binding features to give the site an extra dimension.',
                techUsed: '.NET, Knockout.js, CSS3, SASS, JavaScript, HTML5',
                url: 'http://store.kobobooks.com/',
                active: true
            },
            {
                id: 22,
                slug: 'vaughanMills',
                title: 'Vaughan Mills',
                menuText: 'Vaughan Mills',
                imageURL: [ 'pages/vaughan_mills.jpg' ],
                companyName: 'Sonic Boom Creative Media',
                businessCase: 'Vaughan Mills wanted a complete website refresh for the Spring season. In other words a new colour scheme.',
                details: 'Implemented Photoshop design into .aspx pages. Completely changed the colour scheme using CSS. As well as content change. Updated certain sections via custom Sonic Boom CMS.',
                techUsed: 'Photoshop, HTML, JQuery, JavaScript, CSS',
                url: 'http://www.vaughanmills.com',
                active: true
            },
            {
                id: 21,
                slug: 'melissasMustSpring',
                title: 'Bayview Village - Melissa\'s Must for Spring',
                menuText: 'Bayview Village - Melissa\'s Must',
                imageURL: [
                    'pages/bayview_page_01.jpg',
                    'pages/bayview_page_02.jpg',
                    'pages/bayview_page_03.jpg'
                ],
                companyName: 'Sonic Boom Creative Media',
                businessCase: 'Part of a seasonal campaign to promote shopping at Bayview Village',
                details: 'Pieced together all images and integrated it with a JQuery slideshow plugin for viewing images in a gallery. Each product can be liked on Facebook individually. The entire lookbook can be shared on Facebook as well.',
                techUsed: 'Photoshop, HTML, JQuery, JavaScript, CSS',
                url: 'http://crivas.net/portfolio/bayview2012spring/',
                active: true
            },
            {
                id: 20,
                slug: 'bayviewVillageSpring2012',
                title: 'Bayview Village - Spring 2012 - Flipbook',
                menuText: 'Bayview Village - Spring 2012',
                imageURL: [
                    'pages/page_flip_1.jpg',
                    'pages/page_flip_2.jpg',
                    'pages/page_flip_3.jpg'
                ],
                companyName: 'Sonic Boom Creative Media',
                businessCase: 'Digital brocure showcasing Spring line. Point is to attract business to Bayview Mall in Toronto.',
                details: 'Photoshop work to prepare each image for HTML/CSS integration. Modified Flash page flipping application to suite client\'s specifications.',
                techUsed: 'JQuery, JavaScript, CSS, Photoshop, Flash, ActionScript 3.0, HTML',
                url: 'http://crivas.net/portfolio/spring2012flipbook/',
                active: true
            },
            {
                id: 19,
                slug: 'bayviewVillageLeasingBrochure',
                title: 'Bayview Village - Leasing Brochure - Flipbook',
                menuText: 'Bayview Village - Leasing Brochure',
                imageURL: [ 'pages/flipbook_page.jpg' ],
                companyName: 'Sonic Boom Creative Media',
                businessCase: 'Online digital brocure to attract business to Bayview Mall in Toronto.',
                details: 'Photoshop work to prepare each image for HTML/CSS integration. Modified Flash page flipping application to suite client\'s specifications.',
                techUsed: 'JQuery, JavaScript, CSS, Photoshop, Flash, ActionScript 3.0, HTML',
                url: 'http://www.bayviewvillageshops.theterminal.ca/about/leasing.aspx',
                active: false
            },
            {
                id: 18,
                slug: 'londonHydroPM',
                title: 'London Hydro - Property Manager',
                menuText: 'London Hydro - Property Manager',
                imageURL: [
                    'pages/london_hydro_1.jpg',
                    'pages/london_hydro_2.jpg',
                    'pages/london_hydro_3.jpg',
                    'pages/london_hydro_4.jpg'
                ],
                companyName: 'Sonic Boom Creative Media',
                businessCase: 'Property Manager allows landlords and property managers for the city of London Ontario to mange all their properties availabilities, vacancies, move in and move out dates amongst other things. All related to having some sort of idea of hydro use. So this is primarily geared towards owner of buildings or complexes.',
                details: 'I managed all the HTML,CSS and JavaScript. I had to create new functionality through JavaScript and JQuery. As wel as edit existing functionality and styles. Also implemented support for IE7+ and iPads. Contact me for login credentials.',
                techUsed: 'JQuery, JavaScript, CSS, Photoshop, HTML, Mobile and Tablet Support',
                url: 'https://www.londonhydro.com/propmgmt-dev/sign-in.aspx',
                active: true
            },
            {
                id: 17,
                slug: 'londonHydroTOU',
                title: 'London Hydro - Time of Use',
                menuText: 'London Hydro - Time of Use',
                imageURL: [
                    'pages/lh_tou_1.jpg',
                    'pages/lh_tou_2.jpg',
                    'pages/lh_tou_3.jpg'
                ],
                companyName: 'Sonic Boom Creative Media',
                businessCase: 'Time of Use allowst property owners to track individual water and electricity use. They are able to look at peek high and low usage through graphs and charts. Also allows them to see other pricing plan options to give them an idea of how they can save money. The point of the web app was to make London Hydro\'s customers efficient and smart with their hydro use.',
                details: 'I did all front end development of this site. I added new pages and features and made modifications as neccessary. I implemented new designs. Made viewable for iPad and compatible with IE7 and up. Contact me for login credentials.',
                techUsed: 'JQuery, JavaScript, CSS, Photoshop, HTML, Mobile and Tablet Support',
                url: 'https://www.londonhydro.com/propmgmt-dev/sign-in.aspx',
                active: true
            },
            {
                id: 16,
                slug: 'yorkHeritage',
                title: 'York Heritage',
                menuText: 'York Heritage',
                imageURL: [ 'pages/york_heritage.jpg' ],
                companyName: 'Sonic Boom Creative Media',
                businessCase: 'York Heritage wanted a website update to support new browsers. They also wanted it to be viewable in Apple devices.',
                details: 'I ported some Flash rotators and converted them to JavaScript. Also rebuilt the home page including the main menu. Both the main menu and rotator are custom JQuery plugins. Also edited content and copy site wide.',
                techUsed: 'Custom JQuery Plugin, JavaScript, HTML, CSS',
                url: 'http://www.yorkheritage.com',
                active: true
            },
            {
                id: 15,
                slug: 'videoPlayer',
                title: 'Video Player',
                menuText: 'Video Player',
                imageURL: [ 'pages/video_player_page.jpg' ],
                companyName: 'Research Now',
                businessCase: 'This reason for this was to replace the previous standard video player for surveys. This video player is easier to integrate into the survey framework and offers more options.',
                details: 'This is a video player I designed and developed to be a new solution for the previous standard video player. This video comes with features such as fullscreen, data capturing for points of interest, viewing size, colour templates, and the ability to change the aspect ratio of the video, which I think is pretty important.',
                techUsed: 'Flash, ActionScript 3.0, HTML, JavaScript',
                url: 'http://survey.openvenue.com/DCT/demo/videoplayer/',
                active: true
            },
            {
                id: 14,
                slug: 'slotMachine',
                title: 'Slot Machine Demo',
                menuText: 'Slot Machine Demo',
                imageURL: [ 'pages/slotmachine_page.jpg' ],
                companyName: 'Personal',
                businessCase: '',
                details: 'A company asked me to build a demo for a slot machine as part of the interview process. I built this in 2 hours.',
                techUsed: 'Flash, ActionScript 3.0, HTML, JavaScript',
                url: 'http://crivas.net/portfolio/slotmachine/',
                active: true
            },
            {
                id: 13,
                slug: 'nflSuperBowl',
                title: 'NFL Super Bowl Contest',
                menuText: 'NFL Super Bowl Contest',
                imageURL: [ 'pages/nfl_page.jpg' ],
                companyName: 'Capital C',
                businessCase: 'A contest on Facebook had to be built and added to the Nissan Facebook page.',
                details: 'I built this simple Facebook app. There is a pre-like and post like state. And a form that registers users to the contest. I integrated the design and built the front end.',
                techUsed: 'HTML5, CSS, JavaScript, JQuery, ASP.NET, C#',
                url: 'offline',
                active: true
            },
            {
                id: 12,
                slug: 'jx',
                title: 'Infiniti JX 2012 Contest',
                menuText: 'Infiniti JX 2012 Contest',
                imageURL: [ 'pages/jx_page.jpg' ],
                companyName: 'Capital C',
                businessCase: 'A contest on Facebook had to be built and added to the Infiniti Facebook page to promote their new JX vehicle.',
                details: 'This Facebook app requires you to like it and authorize it to get your Facebook ID. Additional functionality was added to give users an extra entry every 24 hours.',
                techUsed: 'HTML5, CSS, JavaScript, JQuery, ASP.NET, C#',
                offline: 'true',
                url: 'offline',
                active: true
            },
            {
                id: 11,
                slug: 'tommyHilfiger',
                title: 'Tommy Hilfiger Flash Rotator',
                menuText: 'Tommy Hilfiger Rotator',
                imageURL: [ 'pages/th_page.jpg' ],
                companyName: 'Blast Radius',
                businessCase: 'Some sort of eye catching flash component was needed to highlight Tommy Hilfiger\'s holiday clothing line.',
                details: 'I developed this in AS3. I utilized my Hot Spot Generating tool to build the hidden hot spots.',
                techUsed: 'Flash, ActionScript 3.0, HTML, CSS, JavaScript',
                url: 'http://crivas.net/portfolio/tommyhilfiger/',
                active: true
            },
            {
                id: 10,
                slug: 'hotSpotGenerator',
                title: 'Hotspot Generator',
                menuText: 'Hotspot Generator',
                imageURL: [ 'pages/hotspot_generator_page.jpg' ],
                companyName: 'Research Now',
                businessCase: 'A solution was need internally for creating hidden hotspots on images. Hidden hotspots are used to capture areas of interest and report on them.',
                details: 'I designed and developed this tool in AS3. It was used internally by other programmers to speed up their work. Features inlcude exporting coordinates and importing previous coordines. You can also group shapes together and clone other shapes.',
                techUsed: 'ActionScript 3.0, HTML, JavaScript',
                url: 'http://crivas.net/portfolio/hotspotgenerator/',
                active: true
            },
            {
                id: 9,
                slug: 'shelfSet',
                title: 'Shelf Set',
                menuText: 'Shelf Set',
                imageURL: [ 'pages/shelf_set_page.jpg' ],
                companyName: 'Research Now',
                businessCase: 'The previous shelf set tool was part of the standard tools for all surveys. However they needed a knew better version of shelf set that would allow for more options as far as display preferences and data capturing.',
                details: 'This application was developed and designed by me. It\'s suppose to simulate buying a certain braind of proudcts off a shelf. This records which products were viewed in which order. Which products were purchased and in what order. How long in milliseconds each product on the shelf took to purchase.',
                techUsed: 'ActionScript 3.0, HTML, JavaScript',
                url: 'http://crivas.net/portfolio/shelfset/',
                active: true
            },
            {
                id: 8,
                slug: 'gridGrouping',
                title: 'Grid Grouping',
                menuText: 'Grid Grouping',
                imageURL: [ 'pages/radix_page.jpg' ],
                companyName: 'Research Now',
                businessCase: 'External client wanted to display around 100 thumbnails and have the respondent group them quickily and easily. They also wanted the ability to slug these groups.',
                details: 'I designed and developed this tool in AS3 utilizing my custom Flash Framework.',
                techUsed: 'ActionScript 3.0, HTML, JavaScript',
                url: 'http://survey.openvenue.com/DCT/demo/radixgridgrouping/',
                active: true
            },
            {
                id: 7,
                slug: 'observantGrid',
                title: 'Observant Grid',
                menuText: 'Observant Grid',
                imageURL: [ 'pages/obvervant_page.jpg' ],
                companyName: 'Research Now',
                businessCase: 'Unknown to this day.',
                details: 'I designed and developed this tool in AS3 utilizing my custom Flash Framework.',
                techUsed: 'ActionScript 3.0, HTML, JavaScript',
                url: 'http://survey.openvenue.com/DCT/demo/observantgridplus/',
                active: true
            },
            {
                id: 6,
                slug: 'vendingMachine',
                title: 'Vending Machine',
                menuText: 'Vending Machine',
                imageURL: [ 'pages/vending_machine_page.jpg' ],
                companyName: 'Research Now',
                businessCase: 'Client wanted to simulate buying lottery tickets through a vending machine for respondents in the UK.',
                details: 'I designed and developed most of the functionality.',
                techUsed: 'ActionScript 3.0, HTML, JavaScript',
                url: 'http://survey.openvenue.com/DCT/demo/vendingmachine/',
                active: true
            },
            {
                id: 5,
                slug: 'showcase',
                title: 'Showcase',
                menuText: 'Showcase',
                imageURL: [ 'pages/showcase_page.jpg' ],
                companyName: 'Canwest',
                businessCase: 'Showcase website needed to be updated and redesigned.',
                details: 'I helped develop some of the Front End work. I also integrated several Flash components, such as rotator, featured shows, and on tv tonight.',
                techUsed: 'ActionScript 3.0, HTML, JavaScript',
                url: 'http://www.showcase.ca/',
                active: true
            },
            {
                id: 4,
                slug: 'slice',
                title: 'Slice TV',
                menuText: 'Slice TV',
                imageURL: [ 'pages/slice_page.jpg' ],
                companyName: 'Canwest',
                businessCase: 'The Canwest SliceTV media team wanted to revamp the website including the main menu.',
                details: 'There was an issue with the divs overlapping and being clickable when the menu drops down. I worked with another front end developer to communicate from ActionScript via JavaScript to CSS to change the div heights and z-index.',
                techUsed: 'ActionScript 3.0, HTML, JavaScript',
                url: 'http://www.slice.ca/',
                active: true
            },
            {
                id: 3,
                slug: 'scratchTicket',
                title: 'Scratch Ticket',
                menuText: 'Scratch Ticket',
                imageURL: [ 'pages/scratch_ticket_page.jpg' ],
                companyName: 'Research Now',
                businessCase: 'Client wanted a data on how people scratch lottery tickets.',
                details: 'I designed and developed this application. Built to simulate scratching a ticket. Records data for percentage of surface sratched. Has adjustable settings for scratching accuracy and performance for low-CPU usage.',
                techUsed: 'ActionScript 3.0, HTML, JavaScript',
                url: 'http://survey.openvenue.com/DCT/demo/scratchticket/',
                active: true
            },
            {
                id: 2,
                slug: 'cardSort',
                title: 'Card Sort',
                menuText: 'Card Sort',
                imageURL: [ 'pages/card_sort_page.jpg' ],
                companyName: 'Research Now',
                businessCase: 'Research Now needed to improve on their standard tool kit offering to keep up with competitors. One of their main tools is this card sort tool. It is used to rate certain items or brands. For example the instructions could be "Please rate these brand of shoes to your preference". And the user will have to drag and drop the boxes into the corresponding dropzone area.',
                details: 'This was an upgrade from a previous version of Card Sort. Includes features such as colour themes, certain modes that include for example, limiting the number of cards dropped into each dropzone and requiring the user to drop every card.',
                techUsed: 'ActionScript 3.0, HTML, JavaScript',
                url: 'http://crivas.net/portfolio/cardsort/',
                active: true
            },
            {
                id: 1,
                slug: 'cortina',
                title: 'Cortina Kitchens',
                menuText: 'Cortina Kitchens',
                imageURL: [ 'pages/cortina_page.jpg' ],
                companyName: 'JP Lauren',
                businessCase: 'The end client wanted to showcase their kitchen appliances in an eye-catching and captivating manner.',
                details: 'This was my first full functional ActionScript 3.0 website. I went a little crazy with the animations but all and all I think it turned out pretty good.',
                techUsed: 'ActionScript 3.0, HTML',
                url: 'http://www.cortinakitchens.com/',
                active: true
            },
            {
                id: 0,
                slug: 'hydeClub',
                title: 'Hyde',
                menuText: 'Hyde',
                imageURL: [ 'pages/hyde_page.jpg' ],
                companyName: 'Freelance',
                businessCase: 'Redesign and development of club to attract more people.',
                details: 'Pieced together all images and integrated it with a JQuery plugin for viewing images in a gallery. Each product can be liked on Facebook individually and the entire lookbook can be shared on Facebook as well.',
                techUsed: 'ActionScipt 2.0, Photoshop, Illustrator, HTML',
                url: 'http://crivas.net/portfolio/hyde/',
                active: true
            }
        ]

    },

	plugins: [
		{
			id: 0,
			title: 'OwlGallery',
			description: 'Image gallery with various settings and modes. Supports TweenLite/TweenMax and touch device support.',
			link: 'http://crivas.net/git/owlgallery/'
		},
		{
			id: 1,
			title: 'OwlModal',
			description: 'A modal window plugin.',
			link: 'http://crivas.net/git/owlmodal/'
		},
		{
			id: 2,
			title: 'OwlSwipe',
			description: 'A plugin that detects touch events for touch devices including swiping and touch moving.',
			link: 'http://crivas.net/git/owlswipe/'
		},
		{
			id: 3,
			title: 'OwlDropDown',
			description: 'A customizable alternative for a combobox/dropdown list.',
			link: 'http://crivas.net/git/owldropdown/'
		}
	],

    resume: [

        {
            id: 15,
            companyName: 'Uptime Software',
            jobTitle: 'Senior Front End Developer',
            jobType: 'full-time',
            datesAtJob: 'March 2014 - Present',
            tasks: [
                'front end specialist',
                'consuming RESTful API data and display on the front end',
                'using Angular to develop the front end',
                'built unit test and e2e tests using Karma, Jasmine and Protractor'
            ]
        },

	    {
		    id: 14,
		    companyName: 'Bell Media | The Movie Network ',
		    jobTitle: 'Senior Front End Developer',
		    jobType: 'contract',
		    datesAtJob: 'November 2013 - February 2014',
		    tasks: [
			    'responsible for all front end development on TMN website redesign',
			    'worked in Symfony2 backend environment',
			    'created custom JQuery plugins',
                'implemented backend API using Knockout parse JSON and render to front end',
			    'responsive web-design implementation and optimization',
			    'implemented backend API using Knockout to render on the front end',
			    'used TweenMax to animate elements'
		    ]
	    },
	    {
            id: 13,
            companyName: 'Jam3',
            jobTitle: 'Senior Front End Developer',
            jobType: 'contract',
            datesAtJob: 'September 2013 - November 2013',
            tasks: [
                'developed with CodeIgniter PHP framework to maintain backend and code the front end',
                'created custom functionality in PHP/JavaScript for automatic phase switching at certain times',
                'implemented styles and created custom JQuery plugins when needed',
                'worked with RequireJS to implement static page animations and transitions with TweenMax',
                'integrated Grunt tasks for release packages',
                'implemented designs and worked with proprietary internal JavaScript Framework'
            ]
        },
        {
            id: 12,
            companyName: 'Great Gulf',
            jobTitle: 'Senior Front End Developer',
            jobType: 'contract',
            datesAtJob: 'May 2013 - September 2013',
            tasks: [
                'updated and maintained front and back end of numerous company websites',
                'lead developer on multiple projects',
                'worked closely with CTO and Technical Director',
                'mentored and guided junior developers',
                'implemented methods for improving workflow, efficiency and organization',
                'taught employees how to use GitHub'
            ]
        },
        {
            id: 11,
            companyName: 'Motion Season',
            jobTitle: 'Lead Developer',
            jobType: 'contract',
            datesAtJob: 'March 2013 - May 2013',
            tasks: [
                'lead developer on Revolution Movie website',
                'developed website with Knockout.js',
                'integrated CSS3 animations',
                'integrated parallax scrolling effect',
                'fully responsive website via media queries',
                'integrated Grunt tasks for release packages',
                'taught employees how to use GitHub'
            ]
        },
        {
            id: 10,
            companyName: 'Kobo',
            jobTitle: 'UI Developer',
            jobType: 'full-time',
            datesAtJob: 'May 2012 - March 2013',
            tasks: [
                'worked on Kobo\'s Instant Reader web app built on Sproutcore JavaScript framework',
                'responsible for front end bug fixes and implementing new features to the application as needed',
                'worked with design/UX team to implement responsive design on all platforms',
                'workflow involved using GitHub',
                'built research prototypes for potential widgets and functionality in website redesign',
                'built prototypes and performance tested them on various devices',
                'managed site maintenance and improvements',
                'maintained documentation on internal wiki page',
                'collaborated with other teams to solve bugs or research on certain features',
                'collaborated with back end developers to implement full stack features to the Kobo\'s website'
            ]
        },
        {
            id: 9,
            companyName: 'Sonic Boom Creative Media',
            jobTitle: 'Front End Developer',
            jobType: 'contract',
            datesAtJob: 'February 2012 - April 2012',
            tasks: [
                'front end support for existing client websites',
                'go-to developer for all front end projects',
                'develop websites and application using HTML5, CSS, JavaScript and JQuery',
                'some Photoshop retouching and/or manipulation of images'
            ]
        },
        {
            id: 8,
            companyName: 'St. Joseph/Pi Media',
            jobTitle: 'Senior Flash Developer',
            jobType: 'contract',
            datesAtJob: 'January 2012 - February 2012',
            tasks: [
                "made modifications to sections of bell.ca using HTML, CSS and JavaScript",
                "made modifications to a flash application for touch-screen kiosks",
                "integrated design and functionality changes"
            ]
        },
        {
            id: 7,
            companyName: 'Capital C',
            jobTitle: 'Front End Developer',
            jobType: 'contract',
            datesAtJob: 'December 2011 - January 2012',
            tasks: [
                "front end development for multiple Facebook apps utilizing JavaScript, JQuery, HTML, CSS and ASP.NET",
                "integrated multi-lingual support in Facebook environment",
                "built apps requiring authentication by the user via JavaScript Facebook SDK",
                "integrated designs into FB applications",
                "made modifications Infiniti and Nissan websites"
            ]
        },
        {
            id: 6,
            companyName: 'Brightworks',
            jobTitle: 'Senior Flex Developer',
            jobType: 'contract',
            datesAtJob: 'November 2011 - November 2011',
            tasks: [
                "met with clients and stakeholders",
                "developed financial application for RBC utilizing Yodlee framework",
                "prepared Yodlee package for online store release",
                "implemented designs and content"
            ]
        },
        {
            id: 5,
            companyName: 'Blast Radius',
            jobTitle: 'Flash Developer',
            jobType: 'contract',
            datesAtJob: 'October 2011 - November 2011',
            tasks: [
                "developed holiday catalog slider for Tommy Hilfiger using ActionScript 3.0, JavaScript, HTML, CSS",
                "implemented designs and client feedback",
                "implemented SWF Address JavaScript for deep linking",
                "set up review and staging environment and deployment packages for online and internal releases"
            ]
        },
        {
            id: 4,
            companyName: 'Research Now',
            jobTitle: 'Senior Developer and Team Lead',
            jobType: 'full-time',
            datesAtJob: 'July 2008 - September 2011',
            tasks: [
                "met with clients, give quotes, designed, developed, integrated, QA and deployed",
                "developed global Research Now Flash framework for all custom survey tools",
                "met with clients for specification requirements, quotes on custom development",
                "responsible for design on all flash/flex applications",
                "lead senior flash developer on majority of flash and team lead for North American flash team",
                "developed custom interactive survey applications",
                "built AS3 library specifically for company purposes utilizing OOP",
                "optimized classes and components for maximum reusability",
                "developed flex real-time survey reporting application",
                "developed JavaScript code to integrate Flash tools into survey framework"
            ]
        },
        {
            id: 3,
            companyName: 'Canwest/Alliance Atlantis',
            jobTitle: 'Digital Media Developer ',
            jobType: 'contract',
            datesAtJob: 'October 2007 - June 2008',
            tasks: [
                "made modifications to slice.ca and showcase.ca utilizing HTML, CSS and JavaScript",
                "lead flash developer on all flash and front end projects",
                "developed and integrated new flash components for internal use in AS3",
                "optimized classes for efficiency, reusability and extendibility"
            ]
        },
        {
            id: 2,
            companyName: 'Dashboard',
            jobTitle: 'Digital Architect',
            jobType: 'contract',
            datesAtJob: 'July 2007 - September 2007',
            tasks: [
                "lead flash developer on Wayne Gretzky project using HTML, CSS, and ActionScript 3.0",
                "took over for previous developers",
                "integrated back-end client driven CMS into Flash",
                "integrated SWF Address into flash websites for deep linking",
                "implemented all design concepts such as layout, animations, interactivity, and navigation"
            ]
        },
        {
            id: 1,
            companyName: 'Mindblossom',
            jobTitle: 'Intermediate Flash Developer',
            jobType: 'full-time',
            datesAtJob: 'October 2006 - July 2007',
            tasks: [
                "developed websites, games, and flash components using AS2 OOP",
                "developed to the strict deadlines, design and interface architecture principles",
                "implemented all design concepts such as animations, interactivity, and navigation into flash",
                "XML and audio integration"
            ]
        },
        {
            id: 0,
            companyName: 'Engage Learning Systems',
            jobTitle: 'Flash Developer',
            jobType: 'contract',
            datesAtJob: 'October 2005 - April 2006',
            tasks: [
                "project lead in numerous projects",
                "developed E-Learning modules using AS2  for high-profile companies",
                "XML and audio integration for e-learning modules",
                "manipulated and mixed audio files in modules to create a fully functional projects"
            ]
        }

    ]

}