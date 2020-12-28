import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
    	const content = document.getElementById('content')

      	content.focus();
      	setTimeout(
      		content.scrollTo({
	        top: 0,
	        left: 0,
	        behavior: 'smooth',
	      }), 100)
		
    });
    return () => {
      unlisten();
    }
  }, []);

  return (null);
}

export default withRouter(ScrollToTop);