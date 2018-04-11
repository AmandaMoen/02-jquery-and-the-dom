'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// It constructs an instance of the Article class. It's name is capitalized because class names should be capitalized. This refers to the current intance of the class. rawDataObj represents everything bibliographically including the article.

function Article (rawDataObj) {
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // It deep copies everything so all sub-elements of the article template are also copied.

  let $newArticle = $('article.template').clone();
  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);
  $newArticle.find('header > div.byline > address > a').text(this.author);
  $newArticle.find('header > div.byline > address > a').attr('href', this.authorUrl);
  $newArticle.find('header > h1').text(this.title);
  $newArticle.find('section.article-body').html(this.body);
  $newArticle.find('header > div.byline > time').attr('datetime', this.publishedOn);

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle[0];
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// DONE: Refactor these for loops using the .forEach() array method.
// Turns the rawData into an article object.
rawData.forEach(function (data) {
  // Pushes the article object into an array.
  articles.push(new Article(data));
  console.log(articles);
});

// Turns all the articles into HTML for rendering.
articles.forEach(function (data) {
  $('#articles').append(data.toHtml());

});