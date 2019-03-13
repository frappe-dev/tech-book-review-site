import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

// このページが表示された回数
let showCount = 0;

class NoAmazonLinkPage extends Component {

    componentDidMount() {
        const amazonSearchWindowScript = document.createElement("script");
        amazonSearchWindowScript.type = 'text/javascript';
        amazonSearchWindowScript.src = "//z-fe.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1&Marketplace=JP";

        const amazonSearchWindowDetail = document.createElement('script');
        amazonSearchWindowDetail.type = 'text/javascript';
        const config =
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
        amazonSearchWindowDetail.appendChild(document.createTextNode(config));
        const dom = document.getElementById('amazon-search-container');
        if (dom) {
            dom.appendChild(amazonSearchWindowDetail);
            dom.appendChild(amazonSearchWindowScript);
        }
    }

    componentWillUnmount() {
        // 画面を離れるときに生成されたAmazonの検索窓を削除
        // <div id = "amzn_assoc_ad_div_adunit_(表示回数)">という形で生成されるので
        // それを削除する
        var amazonSearchWindow = document.getElementById("amzn_assoc_ad_div_adunit_" + showCount);
        showCount++;
        var rootParent = amazonSearchWindow.parentNode;
        rootParent.removeChild(amazonSearchWindow);
    }

    render() {
        const { location } = this.props;
        console.log(location.state.title)
        return (
            <div>
                <AppHeader />
                <Typography variant="headline" component="h2">
                    {location.state.title}のAmazonリンクを生成できませんでした
                </Typography>
                <Typography variant="headline" component="h2">
                    下の検索窓から検索してみて下さい
                </Typography>
                <div key={Math.random()}>
                    <div className="mt-3 item__wrapper" id="amazon-ads-container">
                        <div id="amazon-search-container"></div>
                        <div id="amzn_assoc_ad_div_adunit0"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(NoAmazonLinkPage));
