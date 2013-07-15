﻿<!DOCTYPE html>
<html>
    <head>
        <title>Crivas Inc.</title>

        <!-- ICONS -->
        <link rel="shortcut icon" href="icons/favicon_32x32.ico" type="image/x-icon" />
        <link rel="icon" href="icons/favicon_32x32.ico" type="image/x-icon" />

        <!-- STYLESHEETS -->
        <link rel="apple-touch-icon" href="icons/icon_32x32x32.png" />
        <link rel="stylesheet" type="text/css" href="css/release/normalize.css" />
        <link rel="stylesheet" type="text/css" href="css/release/main.css" />
        <link rel="stylesheet" type="text/css" href="css/release/headers.css" />
        <link rel="stylesheet" type="text/css" href="css/release/nav-bar.css" />
        <link rel="stylesheet" type="text/css" href="css/release/portfolio.css" />
        <link rel="stylesheet" type="text/css" href="css/release/resume.css" />
        <link rel="stylesheet" type="text/css" href="css/release/contact.css" />

        <!-- CANONICAL -->
        <link rel="canonical" href="http://crivas.net/" />

        <!-- FACEBOOK SHARE OG -->
        <meta name="viewport" content="width=device-width, initial-scale=.5, maximum-scale=1, user-scalable=no" />
        <meta property="og:title" content="Chester Rivas - Online Portofolio" />
        <meta property="og:description" content="Toronto based Front End Developer offering full-service web design and development." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="http://crivas.net/" />
        <meta property="og:image" content="http://crivas.net/icons/icon.png" />
        <meta property="og:site_name" content="Crivas.net" />
        <meta property="fb:admins" content="511581331" />

        <meta name="author" content="Crivas" />
        <meta name="copyright" content="Crivas" />
        <meta name="abstract" content="Toronto based Front End Developer offering full-service web design and development." />
        <meta name="description" content="Toronto based Front End Developer offering full-service web design and development." />
        <meta name="distribution" content="global" />

        <!-- SEO -->
        <meta name="Description" content="Chester Rivas' Online Portfolio - Web-Design, Web Development, HTML5/CSS, JavaScript, JQuery, Flash/Flex/ActionScript">
        <meta name="keywords" content="Chester, Rivas, Chester Rivas, Flash, Toronto, Ontario, Canada, UI, UX, Sproutcore, Knockout.js, Front-End, Front, End, Development, ActionScript, 3.0, 2.0, Flex, Flash, Adobe, HTML, HTML5, CSS, CSS3, JavaScript, JQuery" />

    </head>
<body>

    <header class="nav-bar">
        <div class="nav-bar-fixed">

            <div class="open-small-menu" data-bind="click: $root.openSmallMenu">
                <div class="horizontal-groove"></div>
                <div class="horizontal-groove"></div>
                <div class="horizontal-groove"></div>
            </div>

            <div class="logo"></div>

            <ul class="main-menu" data-bind="foreach: $root.menuList">
                <li class="menu-item" data-bind="text: name, click: $root.menuClick"></li>
            </ul>

        </div>
    </header>

    <section class="main-wrapper">

        <!-- PORTFOLIO SECTION -->
        <section id="portfolio-section" class="main-content-section portfolio-content" data-bind="css: { visibleSection: $root.visiblePortfolio }">

            <h2>Portfolio</h2>

            <div class="portfolio-list" data-bind="foreach: $root.navigationList">
                <button data-bind="html: menuText, click: $root.changePage"></button>
            </div>

            <div class="portfolio-container" data-bind="with: $root.portfolioData">

                <h3 class="port-title" data-bind="text: title"></h3>

                <div class='image-container'>

                    <div class="image-preloader"></div>

                    <div class="striped-border" data-bind="foreach: imageurl">
                        <img class="work-images" data-bind="attr:{src: $data}"/>
                    </div>

                </div>

                <div class="sub">
                    <p class="sub-heading">
                        Company
                    </p>
                    <p class="details" data-bind="text: companyName"></p>
                </div>
                <div class="sub">
                    <p class="sub-heading">
                        Business Case
                    </p>
                    <p class="details" data-bind="text: businessCase"></p>
                </div>
                <div class="sub">
                    <p class="sub-heading">
                        Details
                    </p>
                    <p class="details" data-bind="text: details"></p>
                </div>
                <div class="sub">
                    <p class="sub-heading">
                        Technology Used
                    </p>
                    <p class="details" data-bind="text: techUsed"></p>
                </div>
                <div class="launch">
                    <a data-bind="attr: {href: url}" target="_blank">VIEW</a>
                </div>

            </div>

        </section>

        <div class='indent-line'></div>

        <!-- RESUME SECTION -->
        <section id="resume-section" class="main-content-section resume-content" data-bind="css: { visibleSection: $root.visibleResume }">

            <h2>Resume</h2>

            <div class="stackable">

                <p class="launch"><a href="resume/Chester Rivas CV.docx" target="_blank">DOWNLOAD</a> .docx format (Word 2010)</p>
                <p class="launch"><a href="resume/Chester Rivas CV.doc" target="_blank">DOWNLOAD</a> .doc (Word 2007)</p>
                <p class="launch"><a href="resume/Chester Rivas CV.pdf" target="_blank">DOWNLOAD</a> .pdf (Adobe PDF)</p>

            </div>

            <div class="stackable">

                <h3>Summary</h3>

                <div class='summary' data-bind='html: $root.summaryText'></div>

            </div>

            <div class="stackable">

                <h3>Software and Development Languages</h3>

                <ul class="skillset" data-bind="foreach: $root.skillSet">
                    <li data-bind="text: $data"></li>
                </ul>

            </div>

            <div class="stackable">

                <h3>Work Experience</h3>

                <div data-bind="foreach: $root.experienceList">
                    <div class="job">
                        <p><span class="job-title" data-bind="text: jobTitle"></span></p>
                        <p><span class="company-name" data-bind="text: companyName"></span> | <span class="job-type" data-bind="text: jobType, css: { isFullTime: isFullTime }"></span></p>
                        <p></p>
                        <p><span class="dates-at-job" data-bind="text: datesAtJob"></span></p>
                        <ul data-bind="foreach: tasks">
                            <li data-bind="text: $data"></li>
                        </ul>
                    </div>
                </div>

            </div>

        </section>

        <div class='indent-line'></div>

        <!-- CONTACT SECTION -->
        <section id="contact-section" class="main-content-section contact-content" data-bind="css: { visibleSection: $root.visibleContact }">

            <div class='column'>
                <h2>Contact Info</h2>
                <h3>Chester Rivas</h3>
                <h3>UI Developer</h3>

                <div class='contact-row'>
                    <span class='icon email-icon'></span>
                    <span class='label'>chester.rivas@gmail.com</span>
                </div>

                <div class='contact-row'>
                    <a href="http://ca.linkedin.com/in/crivasinc"><span class='icon linkedin-icon'></span></a>
                    <span class='label'><a href="http://ca.linkedin.com/in/crivasinc">Chester Rivas</a></span>
                </div>

                <div class='contact-row'>
                    <a href="https://github.com/crivas"><span class='icon git-hub-icon'></span></a>
                    <span class='label'><a href="https://github.com/crivas">crivas</a></span>
                </div>


            </div>

            <div class='column'>

                <form id="contact" method="post">

                    <fieldset>
                        <label>First Name</label><br/>
                        <input name="firstname" id="firstname" type="text">
                        <label>Last Name</label><br/>
                        <input name="lastname" id="lastname" type="text">
                        <label>Phone Number</label><br/>
                        <input name="phonenumber" id="phonenumber" type="text">
                        <label>Email</label><br/>
                        <input name="email" id="email" type="text">
                        <label>Message</label><br/>
                        <textarea rows="10" name="message" id="message"></textarea>
                    </fieldset>

                    <input type="submit" value="Send Message" name="submit">

                    <p class="success" style="display:none">Your message has been sent successfully.</p>
                    <p class="error" style="display:none">E-mail must be valid.</p>

                </form>


            </div>

        </section>

    </section>

    <!-- EXTERNAL JS -->
    <script src="js/external/jquery-1.9.1.js" type="text/javascript"></script>
    <script src="js/external/jquery.imagesloaded.js" type="text/javascript"></script>
    <script src="js/external/jquery.localscroll-1.2.7.js" type="text/javascript"></script>
    <script src="js/external/modernizr-2.6.2.js" type="text/javascript"></script>
    <script src="js/external/knockout-2.2.1.js" type="text/javascript"></script>

    <!-- INTERNAL JS -->
    <script src="js/internal/Crivas.Data.js" type="text/javascript"></script>
    <script src="js/internal/Crivas.Main.js" type="text/javascript"></script>
    <script src="js/internal/Crivas.ViewModel.js" type="text/javascript"></script>
    <script src="js/internal/Crivas.EmailForm.js" type="text/javascript"></script>

    <!--<script type="text/javascript" src="//use.typekit.net/wvi2nlg.js"></script>-->
    <!--<script type="text/javascript">try{Typekit.load();}catch(e){}</script>-->

</body>
</html>
