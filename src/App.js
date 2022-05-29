import React, {useState} from 'react';
import moment from 'moment';

function DateTime(props) {
  return (
    <p className="date">{props.date}</p>
  )
}

function withDateFormatting(format) {
  return function(Component) {
    const newComponent = function(props) {
      const formattedDate = format(props);
      return <Component {...props} date={formattedDate}/>
    }

    const componentName =
    Component.displayName || Component.name || 'Component';
    newComponent.displayName = `WithDateFormatting${componentName}`;

    return newComponent;
  }
}

const dateDecorator = withDateFormatting(({date}) => moment(date).fromNow());
const DateTimePretty = dateDecorator(DateTime);

function Video(props) {
  return (
    <div className="video">
      <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      <DateTimePretty date={props.date} />
    </div>
  )
}

function VideoList(props) {
  return props.list.map( (item, i) => <Video key={i} url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00'
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2022-05-22 05:24:00'
    },
  ]);

  return (
    <VideoList list={list} />
  );
}