import React from "react";

class PanelHeader extends React.Component {
  iframe() {
    return {
      __html: `<iframe 
      id="tradingview_2def7" 
      name="tradingview_2def7" 
      src="/static/tradingview/charting_library/static/en-tv-chart.b235e44cb167872e5a6e.html#symbol=KAVAUSDT&amp;interval=60&amp;toolbarbg=rgba(255, 255, 255, 1)&amp;widgetbar=%7B%22details%22%3Afalse%2C%22watchlist%22%3Afalse%2C%22watchlist_settings%22%3A%7B%22default_symbols%22%3A%5B%5D%7D%7D&amp;timeFrames=%5B%5D&amp;locale=en&amp;uid=tradingview_2def7&amp;clientId=0&amp;userId=0&amp;chartsStorageVer=1.0&amp;customCSS=https%3A%2F%2Fbin.bnbstatic.com%2Fstatic%2Ftradingview%2Fthemes%2Ftv-light-theme-v1.min.css&amp;debug=false&amp;timezone=Europe%2FParis&amp;theme=Light" 
      frameborder="0" 
      allowtransparency="true" 
      scrolling="no" 
      allowfullscreen="" 
      style="display: block; width: 100%; height: 100%;"></iframe>`
    }
  }
  render() {
    return (
      <div
        className={
          "panel-header " +
          (this.props.size !== undefined
            ? "panel-header-" + this.props.size
            : "")
        }
      >
        {this.props.content}
      </div>
    );
  }
}

export default PanelHeader;
