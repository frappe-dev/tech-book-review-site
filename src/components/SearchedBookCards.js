import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


function HelloMessage(props) {
    const thumbnailURL = props.item.volumeInfo.imageLinks.thumbnail;
    console.log(thumbnailURL);
    return(
        <Card key={props.index}>
            <CardContent>
                <Typography variant="headline" component="h2">
                    検索結果 {props.index}
                </Typography>
                <Typography component="p">
                    タイトル: {JSON.stringify(props.item.volumeInfo.title)}
                </Typography>
                <img src={thumbnailURL} className="thumbnail" />
            </CardContent>
        </Card>
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