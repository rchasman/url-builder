define(['react', 'components/core/text_input'], function (React, TextInput) {
  var formContents = [
    { name:         "url",
      title:        "What URL do you want to send people to?",
      description:  "This will be the base of your URL.",
      placeholder:  "Enter URL",
      required:     true },
    { name:         "medium",
      title:        "Campaign Medium",
      description:  "This is the channel the link is being used in. Use broad categories like email, social, or ppc.",
      placeholder:  "Campaign Medium",
      required:     true },
    { name:         "source",
      title:        "Campaign Source",
      description:  "What's the specific place that you'll be using this link? For example, email is too broad for this one, use the name of your email list like newsletter or customer list.",
      placeholder:  "Campaign Source",
      required:     true },
    { name:         "name",
      title:        "Campaign Name",
      description:  "Use any name you want. It should be the name of your entire marketing campaign even if you use them in different places and channels.",
      placeholder:  "Campaign Name",
      required:     true },
    { name:         "content",
      title:        "Campaign Content",
      description:  "If you use a bunch of links all in the same spot and all the fields above ar identical, you can use this field to add more detail. For example, one link might be header while your second link is footer.",
      placeholder:  "Campaign Content",
      required:     false },
    { name:         "term",
      title:        "Campaign Term",
      description:  "If you're using this link for search ads and also want to track the search term you're running your ad on, add a campaign term.",
      placeholder:  "Campaign Term",
      required:     false },
  ];

  var UrlContentBox = React.createClass({
    getValue: function() {
      boxName = this.props.content.name;
      value = {};
      value[boxName] = this.refs.input.getDOMNode().value.trim();
      return value;
    },

    render: function() {
      return(
        <div className="col-md-6 url-builder-content-box">
          <h4>{this.props.content.title}</h4>
          <p>{this.props.content.description}</p>
          <TextInput placeholder={this.props.content.placeholder} ref="input" />
        </div>
      );
    }
  });

  var UrlContentForm = React.createClass({
    propTypes: {
      contents: React.PropTypes.array.isRequired
    },

    handleClick: function() {
      resultsVal = {};
      $.extend(resultsVal, this.refs.url.getValue(),
                           this.refs.medium.getValue(),
                           this.refs.source.getValue(),
                           this.refs.name.getValue(),
                           this.refs.content.getValue(),
                           this.refs.term.getValue());
      this.props.handleSubmit(resultsVal);
    },

    render: function() {
      contentsArray = this.props.contents;
      return(
        <div className="url-builder-content">
          <div className="row url-builder-content-row">
            <UrlContentBox 
               content={contentsArray[0]}
               ref="url" />
            <UrlContentBox 
               content={contentsArray[1]}
               ref="medium" />
          </div>
          <div className="row url-builder-content-row">
            <UrlContentBox
               content={contentsArray[2]}
               ref="source" />
            <UrlContentBox
               content={contentsArray[3]}
               ref="name" />
          </div>
          <hr />
          <div className="row url-builder-content-row">
            <UrlContentBox 
               content={contentsArray[4]}
               ref="content" />
            <UrlContentBox
               content={contentsArray[5]}
               ref="term" />
          </div>

          <div className="url-builder-submit row">
            <div className="col-md-12">
              <span className="pull-left">*Required Field.</span>
              <button className="btn btn-primary pull-right" 
                      onClick={this.handleClick}>Build my link!</button>
            </div>
          </div>
        </div>
      )
    }
  });

  var UrlBuilderResult = React.createClass({
    generateResultURL: function() {
      if(_.isUndefined(this.props.result.url)) {
        return "";
      } else {
        resultString = this.props.result.url + "/" +
                       this.props.result.name + "=" +
                       this.props.result.medium + "/" +
                       this.props.result.source + "/";
        return resultString;
      }
    },

    handleClick: function() {
      //Use ZeroClipboard to copy data
      window.alert("Copied to clipboard!");
    },
    
    render: function() {
      return(
        <div className="url-builder-result">
          <h2>Copy and paste your campaign link!</h2>
          <div>
            <TextInput className="col-md-7 col-md-offset-1" value={this.generateResultURL()} placeholder="Your Campaign Link" ref="field"/> <button className="btn btn-primary col-md-3" onClick={this.handleClick} ref="copy">Copy link to clipboard</button>
          </div>
        </div>
      )
    }
  });

  return React.createClass({
    buildResults: {},

    getInitialState: function() {
      return { result: {} };
    },

    handleSubmit: function(results) {
      this.setState({ result: results });
    },

    render: function() {
      return (
        <div className="url-builder-form">
          <UrlContentForm 
              ref="form"
              contents={formContents}
              handleSubmit={this.handleSubmit} />
          <UrlBuilderResult 
              result={this.state.result}
              ref="result" />
        </div>
      );
    }
  });
});
