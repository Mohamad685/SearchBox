import React, { useEffect } from "react";
import "./styles.css";
import { useState } from "react";

const articles = [
	{
		id: 1,
		title: "New York City, USA",
		content:
			"One of the world's leading financial, cultural, and commercial centers, New York City is renowned for its iconic skyline, diverse neighborhoods, and bustling streets. With landmarks like the Statue of Liberty, Times Square, and Central Park, it attracts millions of visitors annually, making it a hub of international tourism and business.",
	},
	{
		id: 2,
		title: "Tokyo, Japan",
		content:
			"As Japan's capital and largest city, Tokyo stands as a vibrant metropolis blending modern innovation with rich cultural heritage. Renowned for its efficient public transportation, cutting-edge technology, and world-class cuisine, Tokyo offers a unique blend of traditional temples, futuristic skyscrapers, and bustling markets, making it a must-visit destination for travelers worldwide.",
	},
	{
		id: 3,
		title: "London, United Kingdom",
		content:
			"Steeped in history and culture, London is a global city known for its iconic landmarks, including the Tower of London, Buckingham Palace, and the British Museum. As a leading financial center and cultural hub, it boasts a diverse population, world-class theaters, and renowned universities, making it a dynamic and cosmopolitan destination.",
	},
	{
		id: 4,
		title: "Paris, France",
		content:
			"The City of Light, Paris is synonymous with romance, art, and gastronomy. Home to iconic landmarks such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral, it exudes elegance and charm at every corner. With its picturesque boulevards, charming cafes, and rich history, Paris continues to captivate visitors from around the globe.",
	},
	{
		id: 5,
		title: "Sydney, Australia",
		content:
			"Nestled along the stunning coastline of New South Wales, Sydney is a vibrant and cosmopolitan city known for its iconic harbor, golden beaches, and vibrant culture. From the Sydney Opera House and Harbour Bridge to Bondi Beach and the Royal Botanic Garden, the city offers a perfect blend of natural beauty, urban sophistication, and outdoor adventure.",
	},
];

function App() {
	const [searchBox, setSearchBox] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [foundWordsCount, setFoundWordsCount] = useState(0);

	useEffect(() => {
		setSearchResults(articles);
	}, []);

	const handleSearch = (e) => {
		const searchValue = e.target.value.toLowerCase();
		setSearchBox(e.target.value);

		const newArticles = articles.filter((article) => {
			const lowerCaseTitle = article.title.toLowerCase();
			const lowerCaseContent = article.content.toLowerCase();

			return (
				lowerCaseTitle.includes(searchValue) ||
				lowerCaseContent.includes(searchValue)
			);
		});
		setSearchResults(newArticles);

		const wordCount = newArticles.reduce((acc, article) => {
			const lowerCaseText =
				article.title.toLowerCase() + " " + article.content.toLowerCase();
			return acc + lowerCaseText.split(searchValue).length - 1;
		}, 0);
		setFoundWordsCount(wordCount);
	};

	const clearSearch = () => {
		setSearchBox("");
		setSearchResults(articles);
		setFoundWordsCount(0);
	};

	const highlight = (text) => {
		if (!searchBox) {
			return text;
		}

		const searchValue = searchBox.toLowerCase();
		const parts = text.split(searchValue);
		const lastIndex = parts.length - 1;

		return parts.map((part, index) => (
			<React.Fragment key={index}>
				{part}
				{index !== lastIndex && <mark>{searchValue}</mark>}
			</React.Fragment>
		));
	};

	return (
		<>
			<div className="search-page">
				<h1>Search</h1>
				<div className="search">
					<input
						type="text"
						value={searchBox}
						onChange={handleSearch}
						className="search-input"
						placeholder={searchBox === "" ? "Write a word or phrase ..." : ""}
					/>
					{searchBox.length > 0 && (
						<button
							className="clear-button"
							onClick={clearSearch}>
							<span>&times;</span>
						</button>
					)}
				</div>

				{foundWordsCount > 0 && (
					<p className="word-count">
						<strong>
							{foundWordsCount} word{foundWordsCount === 1 ? "" : "s"}{" "}
						</strong>
						were found.
					</p>
				)}
				<ul>
					{searchResults.map((article) => (
						<li key={article.id}>
							<h3>{highlight(article.title)}</h3>
							<span>{highlight(article.content)}</span>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default App;
