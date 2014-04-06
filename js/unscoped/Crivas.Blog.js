

Crivas.Blog = {

	posts: [
		{
			id: 1,
			title: 'Writing an Angular Unit Test',
			body: "Basic Configuration" +

"Prerequisites: JetBrains IntelliJ IDEA, npm, and a shell command like tool (Git Bash or Node.js Command Prompt)" +

"This post will instruct you on how to install, configure and run karma at it's most basic and minimal level. In another post I will outline how to run an Angular test." +

"Setup and Run with Karma Only (No Grunt, No IntelliJ)" +

"npm install -g karma" +

"npm install -g karma-cli" +

"This will install the karma packages along with the command line interface." +
"Then run: karma init. This will create a new karma config file. Just follow the prompts. Recommend the following." +

"framework - jasmine" +
"requirejs - no" +
"browser - Chrome" +
"skip" +
"karma watch for changes - no" +
"Create a new IntelliJ project and edit the karma.config.js file." +

"<pre>files: [" +
	"// .. path to test folder" +
	"'js/tests/**/*.js'" +
"],</pre>" +

"Create mytest.js file and describe our first test. For our purposes it will be a hardcoded test that always returns true because that's what we expect." +

"<pre>" +
"describe('hello world', function(){" +
"&npsp;it(\"hard coded truth\", function(){" +
"&npsp;&npsp;expect(true).toBe(true);" +
"&npsp;});" +
"});" +
"</pre>" +

"To run this test type in your command line:" +

"<pre>karma start --single-run</pre>" +

"This will open up the browser run the unit test and close the browser and report on the tests." +

"Run Karma With Grunt" +

"Using the same unit test and Karma config previously defined we will run karma using Grunt." +

"Create Gruntfile.js" +

"<pre>'use strict';" +

"module.exports = function (grunt) {" +
"&nbsp;&#10" +
"&nbsp;grunt.initConfig({" +
"&nbsp;&nbsp;pkg: grunt.file.readJSON('package.json')," +
"&nbsp&nbsp;;karma: {" +
"&nbsp;&nbsp;&nbsp;&nbsp;unit: {" +
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;configFile: 'karma.conf.js'," +
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;singleRun: true" +
"&nbsp;&nbsp;&nbsp;&nbsp;}" +
"&nbsp;&nbsp;}" +
"&nbsp;});" +
"&nbsp;grunt.loadNpmTasks('grunt-karma');" +
"&#10" +
"&nbsp;grunt.registerTask('default', ['karma']);" +
"&#10" +
"};" +
"</pre>" +

"Create package.json" +

"<pre>" +
"{" +
"&nbsp;\"name\": \"MyProject\"," +
"&nbsp;\"version\": \"0.1.0\"," +
"&nbsp;\"devDependencies\": {" +
"&nbsp;&nbsp;\"grunt\": \"~0.4.2\"" +
"&nbsp;}" +
"}"+
"</pre>" +

"Install grunt with the Karma and Jasmine plugins." +

"<pre>" +
"npm install grunt --save-dev" +
"npm install grunt-karma --save-dev" +
"npm install karma-jasmine --save-dev" +
"</pre>" +

"Since we defined Chrome in the karma config file as the test browser we need to install chrome launcher plugin. You can do install any browser launcher you want." +

"<pre>" +
"npm install karma-chrome-launcher --save-dev" +
"</pre>" +

"Now you can test with grunt" +

"<pre>" +
"grunt karma" +
"</pre>" +

"Run Karma in IntelliJ IDEA" +

"Using the same unit test and karma config previously defined we will run karma in the InitelliJ IDEA environment. This options seems to be the best because it offers more powerful options and the ability to export your test to an XML or HTML file. As well as debugging with your IDE. First through your settings install the JetBrains karma plugin and restart IntelliJ." +

"Right click on the karma.config.js file and select Run karma.config.js. This will automatically create a Configuration for this project. You will see all the test run as before except it will keep the local server open. To stop it, click on the Server tab click Stop Karma Server button." +

"To export your test results on Test Run tab click Export Test Results button. From there you can select the format you want to save it to. Recommend HTML." +

"Now we can run grunt karma and hopefully all 6 tests pass. Click HERE to view download the entire project on Git in case I missed anything."
    }
]