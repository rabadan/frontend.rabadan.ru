import React, { Component } from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../../index";
import {IBlog} from "../../interfaces/IBlog";
import {getBlogs} from "../../actions/BlogAction";
// @ts-ignore
import Time from 'react-time-format'
import {Link} from "react-router-dom";


const connector = connect(
  ({ BlogReducer }: TRootState) => ({
    blogs: BlogReducer.blogs,
  }),
  { getBlogs },
);

type TBlogListProps = ConnectedProps<typeof connector>;

interface IBlogState {
  h1: string,
  body: string,
  blogs: IBlog[]
}

class BlogList extends Component<TBlogListProps, IBlogState> {
  constructor(props: Readonly<TBlogListProps>) {
    super(props);

    this.state = {
      h1: "Блог",
      body: "",
      blogs: []
    };
  }

  async componentDidMount() {
    await this.props.getBlogs()
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h1>{this.state.h1}</h1>
          <p>{this.state.body}</p>
        </header>
        <div>
          <BlogsRow blogs={this.props.blogs} />
        </div>
      </div>
    );
  }
}

function BlogsRow(props: { blogs: IBlog[]; }) {
  // для удобства записываем значение props.users в переменную users
  const blogs = props.blogs;
  // используя метод map() и заполняем данными тег li
  const listItems = blogs.map(( blog, index ) =>
    <div key={ index.toString() } className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <h3 className="mb-0 mt-0">{ blog.title }</h3>
        <div className="mb-1 text-muted">
          <Time value={blog.created_at} format="YYYY-MM-DD" />
        </div>
        <p className="card-text mb-auto">{ blog.preview }</p>
        <Link to={`/blogs/${blog.slug}`} className="stretched-link">
          Continue reading
        </Link>
      </div>
      <div className="col-auto d-none d-lg-block">
        <svg className="bd-placeholder-img text-center" width="200" height="250" xmlns="http://www.w3.org/2000/svg"
             preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c"></rect>
          <text x="33%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
        </svg>
      </div>
    </div>
  );
  // Возвращаем список с именами пользователей
  return (
    <div> { listItems } </div>
  );
}


export default connector(BlogList);