import React, { Component } from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../../index";
import {IBlog} from "../../interfaces/IBlog";
import {getBlog} from "../../actions/BlogAction";
// @ts-ignore
import Time from 'react-time-format'

const connector = connect(
  ({ BlogReducer }: TRootState, {match}: any) => ({
    blog: BlogReducer.blog,
    slug: match.params.slug
  }),
  { getBlog }
);

type TBlogProps = ConnectedProps<typeof connector>;

interface IBlogState {
  h1: string,
  blog?: IBlog
}

class BlogItem extends Component<TBlogProps, IBlogState> {
  constructor(props: Readonly<TBlogProps>) {
    super(props);

    this.state = {
      h1: "Блог",
      blog: undefined
    };
  }

  async componentDidMount() {
    await this.props.getBlog(this.props.slug)
  }

  render() {
    return (
      <div className="container">
        <div>
          <BlogPage blog={this.props.blog} />
        </div>
      </div>
    );
  }
}

function BlogPage(props: { blog?: IBlog; }) {
  // для удобства записываем значение props.users в переменную users
  if (props.blog === undefined) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  const blog = props.blog;
  // Возвращаем список с именами пользователей
  return (
    <div>
      <div key={ blog.id } className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <h3 className="mb-0 mt-0">{ blog.title }</h3>
          <div className="mb-1 text-muted">
            <Time value={blog.created_at} format="YYYY-MM-DD" />
          </div>
          <p className="card-text mb-auto">{ blog.preview }</p>
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
      <div className="mt-3 shadow border rounded bg-white p-3">
        {blog.body}
      </div>
    </div>
  );
}

export default connector(BlogItem);
