import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaPlus } from 'react-icons/fa';

import Menu from './ListItemMenu';
import convertSegMin from '../utils/convertSegMin';

// Assets
import PlayingGif from '../assets/images/equalizer-2.gif';

// Contexts
import { usePlayer } from '../context/PlayerContext';
import { useMedia } from '../context/MediaContext';
import { usePlaylist } from '../context/PlaylistContext';

function ListItem(props) {
	const { player, setPlayer } = usePlayer();
	const { media, setMedia } = useMedia();
	const { playlist, setPlaylist } = usePlaylist();

	const [isThisSong, setIsThisSong] = useState(false);
	const [menuVisible, setMenuVisible] = useState(false);

	function changeMusic() {
		const newMusic = {
			...props.music,
			file: `http://localhost:3333/song/${props.music.file}`
		}

		setMedia(newMusic);
		setPlayer({...player, firstMusic: false})

		if(playlist.playlistId === props.playlistId){
			setPlaylist({...playlist, music: props.id - 1})
		} else {
			setPlaylist({data: props.newPlaylist, music: props.id - 1, playlistId: props.playlistId});
		}
	}

	// Verificar se é essa musica que está tocando
	useEffect(() => {
		if (media.name === props.music.name && media.artist === props.music.artist
			&& media.album === props.music.album)
		{
			setIsThisSong(true);
		} else {
			setIsThisSong(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [media]);

	function toggleOptions(){
		setMenuVisible(!menuVisible);
	}

	return (
		<tr className="list-item">
			<th className="index-th">
				<button onClick={changeMusic} className="btn-play">
					{
						isThisSong ?
							(
								<div className="is-this-song">
									{
										player.playing ?
										(
											<>
												<img className="equalizer-gif not-hover" src={PlayingGif} alt="gif" />

												<div className="hover">
													<FaPause size={15} />
												</div>
											</>
										)
										: (
											<>
												<FaPause className="not-hover" size={15} />

												<div className="hover">
													<FaPlay size={15} />
												</div>
											</>
										)
									}
								</div>
							)
							: (
								<div className="not-this-song">
									<div className="id not-hover">{props.id}</div>

									<div className="hover">
										<FaPlay size={15} />
									</div>
								</div>)
					}
				</button>
			</th>
			<th>{props.music.name}</th>
			<th className="artist-th">{props.music.artist}</th>
			<th className="album-th">{props.music.album}</th>
			<th className="duration-th">{convertSegMin(props.music.duration)}</th>
			<th className="options-th">
				<center>
					<button onClick={toggleOptions}><FaPlus /></button>
					{
					menuVisible ?
					(
						<div className="overlay" onClick={toggleOptions}>
							<Menu id={props.music.id} />
						</div>
					) 
						
					: ''
					}
				</center>
			</th>
		</tr>
	);
}

export default ListItem;