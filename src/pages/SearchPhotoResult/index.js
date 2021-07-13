import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import {
  getSearchResult,
  resetState,
  incrementPage,
} from "store/searchPhoto/searchAction";
import { ExploreImage, LoadingCircle, ErrorPage } from "components";
import {
  ImageColumn,
  ImageArea,
  ImageContainer,
} from "components/UI/Layout/ThreeColumnLayout.styles";
import {
  PhotosAndSelectionsContainer,
  StyledLink,
  PhotoResultDetails,
  PhotoSelectionSwitch,
  UnderScoredLink,
  DisplayArea
} from "components/UI/Layout/SearchPageInfoLayout.styles";

function SearchPhotoResult(props) {
  const ref = React.createRef();

  useEffect(() => {
    const loadingBar = ref.current;
    isLoading ? loadingBar.continuousStart() : loadingBar.complete();
    return function cleanup() {
      loadingBar.complete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchResult.isLoading]);

  useEffect(() => {
    if (props.searchResult.page !== 1) {
      props.getSearchResult(props.match.params.searchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchResult.page]);

  useEffect(() => {
    props.getSearchResult(props.match.params.searchTerm);
    return function cleanup() {
      props.resetState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.searchTerm]);

  const {
    data,
    isLoading,
    hasError,
    totalResult,
    renderObject,
    page,
    maxPage,
  } = props.searchResult;
  const hasData = !!data.length && !hasError;
  const searchTerm = props.match.params.searchTerm.toLowerCase();

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasData && (
        <DisplayArea>
          <PhotosAndSelectionsContainer>
            <PhotoResultDetails>
              <div>Search results for "{searchTerm}"</div>
              <div>{totalResult} Photos found</div>
            </PhotoResultDetails>
            <PhotoSelectionSwitch>
              <UnderScoredLink to={`/search/photos/${searchTerm}`}>
                Photos
              </UnderScoredLink>
              <StyledLink to={`/search/collections/${searchTerm}`}>
                Collections
              </StyledLink>
              <StyledLink to={`/topic/${searchTerm}`}>
                Topic
              </StyledLink>
            </PhotoSelectionSwitch>
          </PhotosAndSelectionsContainer>
          <InfiniteScroll
            dataLength={data.length}
            next={props.incrementPage}
            hasMore={page <= maxPage}
          >
            <ImageContainer>
              <ImageArea>
                {renderObject.map((column) => (
                  <ImageColumn key={column.key}>
                    {column.images.map((item) => (
                      <ExploreImage key={item.id} item={item} restrict />
                    ))}
                  </ImageColumn>
                ))}
              </ImageArea>
            </ImageContainer>
          </InfiniteScroll>
        </DisplayArea>
      )}
      {hasError && <ErrorPage />}
      {isLoading && <LoadingCircle />}
    </>
  );
}

const mapStateToProps = (state) => ({
  searchResult: state.searchPhoto,
});

const mapDispatchToProps = {
  getSearchResult,
  resetState,
  incrementPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPhotoResult);
