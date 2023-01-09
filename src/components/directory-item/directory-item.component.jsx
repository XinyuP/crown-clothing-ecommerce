import { Link } from 'react-router-dom';
import './directory-item.styles.scss';

const DirectoryItem = ({ category }) => {
    const { imageUrl, title } = category;
    const target = 'shop/' + title.toLowerCase()
 	return (
		<div className='directory-item-container'>
			<div
				className='background-image'
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			/>
			<div className='body'>
                <h2>{title}</h2>
                
                {/* <p>SHOP NOW</p> */}
                <Link to={target}>
					SHOP NOW
				</Link>
			</div>
		</div>
	);
};

export default DirectoryItem;
