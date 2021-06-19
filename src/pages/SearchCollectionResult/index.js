import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { getSearchUrl } from "utils";
import ImageCollection from "components/ImageCollection";
import {
  ImageContainer,
  ImageColumn,
  PhotosAndSelectionsContainer,
  StyledLink,
  PhotoResultDetails,
  PhotoSelectionSwitch,
  UnderScoredLink,
  ImageArea,
} from "./SearchCollectionResult.styles";

export default class SearchCollectionResult extends React.Component {
  state = {
    data: [],
    renderObject: [
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
    ],
    hasError: false,
    page: 0,
    maxPage: 0,
    totalResult: 0,
  };

  getData = async () => {
    try {
      this.setState({ hasError: false });
      const searchInput = this.props.match.params.input;
      const response = await axios(
        getSearchUrl({
          isPhoto: false,
          query: searchInput,
          page: this.state.page,
        })
      );
      const newList = response.data.results;
      this.setState({
        data: [...this.state.data, newList],
        renderObject: this.splitDataToColumns(newList),
        page: this.state.page + 1,
        maxPage: response.data.total_pages,
        totalResult: response.data.total,
      });
    } catch (err) {
      console.log(err);
      this.setState({ hasError: true });
    }
  };

  splitDataToColumns = (newData) => {
    const newRenderObject = [...this.state.renderObject];
    let counter = 0;

    while (counter < newData.length) {
      newRenderObject[counter % 3].images.push(newData[counter]);
      counter++;
    }
    return newRenderObject;
  };

  componentDidMount() {
    this.getData();
    this.setState({ page: 1 });
  }

  componentDidUpdate(prevPros) {
    if (this.props.match.params.input !== prevPros.match.params.input) {
      this.setState({
        page: 1,
        data: [],
        renderObject: [
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
        ],
        maxPage: 0,
        totalResult: 0,
      });
      this.getData();
    }
  }

  render() {
    const loadSuccess = this.state.data.length;
    return (
      loadSuccess && (
        <>
          <PhotosAndSelectionsContainer>
            <PhotoResultDetails>
              <div>Search results for "{this.props.match.params.input}"</div>
              <div>{this.state.totalResult} collections found</div>
            </PhotoResultDetails>
            <PhotoSelectionSwitch>
              <StyledLink
                to={`/search/photos/${this.props.match.params.input}`}
              >
                Photos
              </StyledLink>
              <UnderScoredLink
                to={`/search/collections/${this.props.match.params.input}`}
              >
                Collections
              </UnderScoredLink>
            </PhotoSelectionSwitch>
          </PhotosAndSelectionsContainer>
          <InfiniteScroll
            dataLength={this.state.renderObject[0].images.length}
            next={this.getData}
            hasMore={this.state.page <= this.state.maxPage}
            loader={<h4>Loading...</h4>}
          >
            <ImageContainer>
              <ImageArea>
                {this.state.renderObject.map((column) => (
                  <ImageColumn key={column.key}>
                    {column.images.map((item, index) => (
                      <ImageCollection key={column.key * index} item={item} />
                    ))}
                  </ImageColumn>
                ))}
              </ImageArea>
            </ImageContainer>
          </InfiniteScroll>
        </>
      )
    );
  }
}
