var searchResults = Backbone.View.extend({
  noResultsMsg: "No results found",

  initialize: function() {
    this.listenTo(this.collection, "reset", this.render);
    this.listenTo(this.collection, "empty", this.clearView);
  },

  render: function() {
    this.clearView();
    if (this.collection.length === 0) {
      this.$el.append("<div class='search-card'>" + this.noResultsMsg + "</div>");
    } else {
      for (var i in this.collection.models) {
        this.renderResult(this.collection.models[i].attributes);
      }
    }
    return this;
  },

  renderResult: function(searchResult) {
    this.$el.append(_.template(searchCard, searchResult));
  },

  clearView: function() {
    this.$el.children('.search-card').remove();
  }
});

var searchForm = Backbone.View.extend({
  events: {
    "keyup":  "updateModel",
    "submit": "submitForm"
  },

  initialize: function() {
    this.model = new Backbone.Model();
    this.model.on('change:content', _.debounce(this.fetch.bind(this), 200 ));
  },

  updateModel: function(e) {
    this.model.set({content: this.textFieldVal()});
  },

  fetch: function() {
    var self = this;
    if (self.model.get("content") === "") {
      self.collection.reset([]);
      return self.collection.trigger('empty');
    }
    $.ajax({
      type: 'GET',
      url: self.query(),
      success: function(data) {
        self.collection.reset(JSON.parse(data));
      },
      error: function(xhr, status, error) {
        self.displayError(error);
      },
    });
  },

  submitForm: function(e) {
    e.preventDefault();
    this.fetch();
  },

  query: function() {
    var action = this.$el.attr('action');
    var encodedContent = encodeURIComponent(this.model.get("content"))
    return [action, '/', '?search=', encodedContent].join('');
  },

  textFieldVal: function() {
    return this.$el.children('.text-field').val().trim();
  },

  displayError: function(message) {
    this.$el.after("<div>" + message + "</div>");
  },
});


$(document).ready(function(){
  var resultsCollection = new Backbone.Collection();
  var formView = new searchForm({el: $('.al-company-form'),
                         collection: resultsCollection});
  var resultsView = new searchResults({el: $('.al-summary-results'),
                               collection: resultsCollection});

  $('.loading').hide();
  $('.loaded').show();
});
