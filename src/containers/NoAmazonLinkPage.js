import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';

// header
import AppHeader from '../components/AppHeader';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class NoAmazonLinkPage extends Component {

    componentDidMount() {
        const script = document.createElement("script");
        script.type = 'text/javascript';
        script.src = "//z-fe.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1&Marketplace=JP";

        const s = document.createElement('script');
        s.type = 'text/javascript';
        const code =
            `amzn_assoc_ad_type = "responsive_search_widget";
            amzn_assoc_tracking_id = "ayathuzithuka-22"; 
            amzn_assoc_marketplace = "amazon"; 
            amzn_assoc_region = "JP"; 
            amzn_assoc_placement = ""; 
            amzn_assoc_search_type = "search_widget"; 
            amzn_assoc_width = "auto"; 
            amzn_assoc_height = "auto"; 
            amzn_assoc_default_search_category = ""; 
            amzn_assoc_default_search_key = ""; 
            amzn_assoc_theme = "light"; 
            amzn_assoc_bg_color = "FFFFFF";`
        s.appendChild(document.createTextNode(code));
        const dom = document.getElementById('amazon-search-container');
        if (dom) {
            dom.appendChild(s);
            dom.appendChild(script);
        }
    }

    componentDidUpdate() {
        return (
            <div>
            </div>
        )
    }

    render() {
        return (
            <div id>
                <AppHeader />
                申し訳ありません
                <br />
                {this.props.bookTitle}のAmazonリンクを生成出来ませんでした
                <br />
                下から検索して下さい
                <div className="mt-3 item__wrapper" id="amazon-ads-container">
                    <div id="amazon-search-container">&nbsp;</div>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(NoAmazonLinkPage));
