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
    if ( "volumeInfo" in props.item) {
        thumbnailURL = props.item.volumeInfo.imageLinks.thumbnail;
    }

    let bookID = "";
    if ( "id" in props.item) {
        bookID = props.item.id;
    } else {
        //idがないものは表示しない(returnの仕方は暫定)
        return(
            <h3>no data</h3>
        );
    }

    // ISBNがあれば取得
    let ISBN = "";
    if ( "industryIdentifiers" in props.item.volumeInfo){
        if (props.item.volumeInfo.industryIdentifiers[1]) {
            ISBN = props.item.volumeInfo.industryIdentifiers[1].identifier;
        }
    }
    
    const alt = "image"+props.index;
    
    // cf. https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md 
    return(
        <Link to={{
            pathname: "/bookinfo/"+bookID,
            state: { 
                bookID: bookID,
                title: title,
                thumbnailURL: thumbnailURL,
                ISBN: ISBN
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
