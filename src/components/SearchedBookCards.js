import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

// XXX: Card.jsにcomponentを分ける
function HelloMessage(props) {
    const title = JSON.stringify(props.item.volumeInfo.title);
    
    // XXX: jsonのif判定は見直したほうがいいかも
    let thumbnailURL = "https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png";
    if (props.item.volumeInfo.imageLinks) {
        thumbnailURL = props.item.volumeInfo.imageLinks.thumbnail;
    }
    
    // ISBNをここではURLに使う(暫定, 他のIDとか何でもいい)
    let ISBN = "XXXXXXXXXX";
    if (props.item.volumeInfo.industryIdentifiers){
        ISBN = props.item.volumeInfo.industryIdentifiers[1].identifier;
    }

    const alt = "image"+props.index;
    // XXX: props.itemがからの場合の処理を追加するべきかも
    
    // cf. https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md 
    return(
        <Link to={{
            pathname: "/bookinfo/"+ISBN,
            state: { 
                title: title,
                thumbnailURL: thumbnailURL,
                } 
            }}>
            <Card key={props.index}>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        検索結果 {props.index}
                    </Typography>
                    <Typography component="p">
                        タイトル: {title}
                    </Typography>
                    <img src={thumbnailURL} alt={alt} className="thumbnail" />
                </CardContent>
            </Card>
        </Link>
    )
}

export default class SearchedBookCards extends React.Component {
    render() {
        const { itemData } = this.props;
        return(
            <div>
                {
                    itemData && itemData.map((item, index) =>
                        <HelloMessage item={item} index={index} key={index} />
                    )
                }
            </div>
        );
    }
}
