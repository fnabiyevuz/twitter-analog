import React from "react"
import AppHeader from "../AppHeader"
import PostAddForm from "../PostAddForm"
import PostList from "../PostList"
import PostStatusFilter from "../PostStatusFilter"
import SearchPanel from "../SearchPanel"
import './App.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { label: 'Going to learn React JS', important: true, like: false, id: 1 },
                { label: 'Going to learn Angular JS', important: false, like: false, id: 2 },
                { label: 'Going to learn Vue JS', important: false, like: false, id: 3 }
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.onToggleImpportant = this.onToggleImpportant.bind(this)
        this.onToggleLiked = this.onToggleLiked.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelect = this.onFilterSelect.bind(this)

        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);

            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        };
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImpportant(id) {
        console.log(`Important ${id}`)
    }

    onToggleLiked(id) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);
            const oldItem = data[index]
            const newItem = { ...oldItem, important: !oldItem.important, like: !oldItem.like }
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter(item => {
            return item.label.indexOf(term) > -1
        })
    }

    onUpdateSearch(term) {
        this.setState({ term });
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onFilterSelect(filter) {
        this.setState({ filter });
    }

    render() {
        const { data, term, filter } = this.state
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter)

        return (
            <div className="app">
                <AppHeader liked={liked} allPosts={allPosts} />
                <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <PostStatusFilter filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImpportant={this.onToggleImpportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm onAdd={this.addItem} />
            </div>
        )
    }
}
