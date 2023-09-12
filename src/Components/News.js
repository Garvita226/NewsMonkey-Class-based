import React, { Component } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        pageSize: '9',
        country: 'in',
        category: 'general'
    }

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }

    articles = [];

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    constructor(props) {
        super(props);
        // console.log("Constructor")
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalResults: 0
        };
        document.title = `NewsMonkey - ${this.capitalize(this.props.category)}`
    }

    updateNews = async () => {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        this.setState({loading: true})
        this.props.setProgress(30)
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(50)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false 
        })
    }

    // handlePrevClick = async () => {
    //     // console.log('Previous')
    //     this.setState({
    //         page: this.state.page - 1
    //     })
    //     this.updateNews()
    // }

    // handleNextClick = async () => {
    //     // console.log('Next')
    //     this.setState({
    //         page: this.state.page + 1
    //     })
    //     this.updateNews()
    // }

    render() {
        return (
            <>
                <h1 className="text-center my-3">{`NewsMonkey - Top ${this.capitalize(this.props.category)} Headlines`}</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.loading && <Spinner />}
                >
                    <div className="container my-3">
                    {<div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title.slice(0, 45) : ''}
                                    description={element.description ? element.description.slice(0, 88) : ''}
                                    imageUrl={element.urlToImage ? element.urlToImage : 'https://beebom.com/wp-content/uploads/2023/06/Google-Pixel-7-Pro-in-Green-color-option-showcased-with-a-gray-background.jpg'}
                                    url={element.url}
                                    author={element.author ? element.author : 'Unknown'}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        })}
                    </div>}
                    </div>
                </InfiniteScroll>
                {/* <div className="d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div> */}

            </>
        );
    }
}

export default News;


