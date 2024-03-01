import React, { useEffect } from "react";
import "./styles.css";
import { useState } from "react";
import { articles } from "./Mockdata";

function App() {
	const [searchBox, setSearchBox] = useState("")
	const [searchResults, setSearchResults] = useState([])
	const [foundWordsCount, setFoundWordsCount] = useState(0)
	useEffect(() => {
		setSearchResults(articles)
	}, []);

	const handleSearch = (e) => {
		const searchValue = e.target.value.toLowerCase()
		setSearchBox(e.target.value);

		const newArticles = articles.filter((article) => {
			const lowerCaseTitle = article.title.toLowerCase()
			const lowerCaseContent = article.content.toLowerCase()

			return (
				lowerCaseTitle.includes(searchValue) ||
				lowerCaseContent.includes(searchValue)
			);
		});
		setSearchResults(newArticles);

		const wordCount = newArticles.reduce((acc, article) => {
			const lowerCaseText =
				article.title.toLowerCase() + " " + article.content.toLowerCase()
			return acc + lowerCaseText.split(searchValue).length - 1
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
			return text
		};

		const searchValue = searchBox.toLowerCase()
		const parts = text.toLowerCase().split(searchValue)
		const lastIndex = parts.length - 1

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
