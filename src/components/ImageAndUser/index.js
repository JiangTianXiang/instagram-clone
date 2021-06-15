import React from "react";
import DisplayImage from "../DisplayImage";
import Author from "../Author";
import {
  ImageAndUserContainer,
  Likes,
  ImageAndUserFooter,
  FavoriteButton,
  PostBio,
  LikesContainer,
  LikeIcon,
} from "./ImageAndUser.styles";
import { getDiffInTime } from "utils/index";
import favoriteIcon from "utils/resources/Iconly-Broken-Star.png";
import likeIcon from "utils/resources/Iconly-Broken-Heart.png";

export default class ImageAndUser extends React.Component {
  state = {
    data: this.props.item,
  };

  render() {
    return (
      <ImageAndUserContainer>
        <Author
          getUser={this.state.data.user}
          timeStamp={getDiffInTime(this.state.data.updated_at)}
        />
        {this.state.data.description && (
          <PostBio>{this.state.data.description}</PostBio>
        )}
        <DisplayImage
          url={this.state.data.urls.regular}
          placeholder={this.state.data.color}
        />
        <ImageAndUserFooter>
          <LikesContainer>
            <LikeIcon src={likeIcon} />
            <Likes>{`${this.state.data.likes}`} </Likes>
          </LikesContainer>
          <FavoriteButton src={favoriteIcon} />
        </ImageAndUserFooter>
      </ImageAndUserContainer>
    );
  }
}
