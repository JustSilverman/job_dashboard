companyCard =
  '<div class="company-card"> \
    <div class="pull-right"> \
      <a href="<%= url %>"> \
        <img class="image" src="<%= pic %>"/> \
      </a> \
      <a class="jobs-link" href="<%= url %>"> \
        View jobs \
      </a> \
    </div> \
    <h6 class="title"> \
      <a href="<%= url %>"><%- name %></a> \
    </h6> \
    <span class="location"><%- location %></span> \
    <span class="industry"><%- industry %></span> \
  </div>';

searchCard =
  '<div class="search-card"> \
    <div class="pull-left"> \
      <a href="<%= url %>"> \
        <img class="image" src="<%= pic %>"/> \
      </a> \
    </div> \
    <h6 class="title"> \
      <a href="<%= url %>"><%- name %></a> \
      <span class="subheader">(INDUSTRY TO COME)</span> \
    </h6> \
  </div>';
