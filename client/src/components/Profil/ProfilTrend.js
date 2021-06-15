import React from 'react';

const ProfilTrend = ({ oneUser }) => {
	return (
		<div className="profilTrend-container">
      <div className='user-info'>
			<img src={oneUser.pictureUrl} alt="user-pic" />
      <h1>{oneUser.username}</h1>
      </div>
			<div className="user-bio">
      <h3>Bio : {oneUser.bio}</h3>
			</div>
     
		</div>
	);
};

export default ProfilTrend;
