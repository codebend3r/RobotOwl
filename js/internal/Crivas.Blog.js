

Crivas.Blog = {

	posts: [
		{
			id: 1,
			title: 'Writing an Angular Unit Test'
			body: "Basic Configuration

Prerequisites: JetBrains IntelliJ IDEA, npm, and a shell command like tool (Git Bash or Node.js Command Prompt)

This post will instruct you on how to install, configure and run karma at it's most basic and minimal level. In another post I will outline how to run an Angular test.

Setup and Run with Karma Only (No Grunt, No IntelliJ)

npm install -g karma

npm install -g karma-cli
This will install the karma packages along with the command line interface.
Then run: karma init. This will create a new karma config file. Just follow the prompts. Recommend the following.

framework - jasmine
requirejs - no
browser - Chrome
skip
karma watch for changes - no
Create a new IntelliJ project and edit the karma.config.js file.

<pre>
files: [
	// .. path to test folder
	'js/tests/**/*.js'
],
</pre>

Create mytest.js file and describe our first test. For our purposes it will be a hardcoded test that always returns true because that's what we expect.

<pre>
describe('hello world', function(){
	it(\"hard coded truth\", function(){
		expect(true).toBe(true);
	});
});
</pre>

To run this test type in your command line:

<pre>
karma start --single-run
</pre>

This will open up the browser run the unit test and close the browser and report on the tests.

Run Karma With Grunt

Using the same unit test and Karma config previously defined we will run karma using Grunt.

Create Gruntfile.js

<pre>
'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['karma']);

};
</pre>

Create package.json

<pre>
{
	\"name\": \"MyProject\",
	\"version\": \"0.1.0\",
	\"devDependencies\": {
		\"grunt\": \"~0.4.2\" 
	}
}
</pre>

Install grunt with the Karma and Jasmine plugins.

<pre>
npm install grunt --save-dev
npm install grunt-karma --save-dev
npm install karma-jasmine --save-dev
</pre>

Since we defined Chrome in the karma config file as the test browser we need to install chrome launcher plugin. You can do install any browser launcher you want.

<pre>
npm install karma-chrome-launcher --save-dev
</pre>

Now you can test with grunt

<pre>
grunt karma
</pre>

Run Karma in IntelliJ IDEA

Using the same unit test and karma config previously defined we will run karma in the InitelliJ IDEA environment. This options seems to be the best because it offers more powerful options and the ability to export your test to an XML or HTML file. As well as debugging with your IDE. First through your settings install the JetBrains karma plugin and restart IntelliJ.

Right click on the karma.config.js file and select Run karma.config.js. This will automatically create a Configuration for this project. You will see all the test run as before except it will keep the local server open. To stop it, click on the Server tab click Stop Karma Server button.

To export your test results on Test Run tab click Export Test Results button. From there you can select the format you want to save it to. Recommend HTML."
		},
		{
			id: 2,
			title: 'Writing an Angular E2E Test'
			body: ''
		}
	]

};