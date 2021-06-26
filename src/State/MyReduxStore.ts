import {PostPropsType} from "../Content/Posts/Post";
import {MessagePropsType} from "../Dialogs/Message/Message";
import {DialogItemPropsType} from "../Dialogs/Dialog/Dialog";
import {addMessagesActionCreator, changeMessageTextActionCreator, dialogReducer} from "./dialogReducer";
import {addPostActionCreator, changeTextActionCreator, profileReducer} from "./profileReducer";
import {showSidebarActionCreator, sidebarReducer} from "./sidebarReducer";


export type arrayPostsTypes = Array<PostPropsType>
export type arrayMessages = Array<MessagePropsType>
export type arrayDialog = Array<DialogItemPropsType>


export type profilePageType = {
    posts: arrayPostsTypes;
    newPostText: string;
};
export type dialogPageType = {
    dialogsData: arrayDialog;
    messagesData: arrayMessages;
    newMessageText: string;
}

export type rootStateType = {
    profilePage: profilePageType,
    dialogPage: dialogPageType,
    sidebar: {}
}
export type ActionsType =
    ReturnType<typeof changeMessageTextActionCreator> |  //returnType - берет у типа функции и отсекает только возвращаемую часть
    ReturnType<typeof addMessagesActionCreator> |
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof changeTextActionCreator>|
    ReturnType<typeof showSidebarActionCreator>;  // typeof - берет полностью функцию и создает для нее конретный тип

export type storeType = {
    _state: rootStateType;
    _subscriber: () => void;
    onChangeCallback: (newPostText: string) => void;
    subscribe: (observer: () => void) => void;
    getState: () => rootStateType;
    dispatch: (action: ActionsType) => void;
}

export const store: storeType = {
    _state: {
        profilePage: {
            newPostText: '',
            posts: [
                {id: '1', text: 'hi there', likes: 5},
                {
                    id: '2',
                    text: 'hi there',
                    likes: 5,
                    avatar: 'https://banner2.cleanpng.com/20181231/fta/kisspng-computer-icons-user-profile-portable-network-graph-circle-svg-png-icon-free-download-5-4714-onli-5c2a3809d6e8e6.1821006915462707298803.jpg'
                },
                {
                    id: '2',
                    text: 'hi there',
                    likes: 5,
                    avatar: 'https://www.pngitem.com/pimgs/m/420-4204652_oic-provincial-statistics-officer-psa-maguindanao-user-icon.png'
                },
                {
                    id: '4',
                    text: 'hi there',
                    likes: 5,
                    avatar: 'https://banner2.cleanpng.com/20181231/fta/kisspng-computer-icons-user-profile-portable-network-graph-circle-svg-png-icon-free-download-5-4714-onli-5c2a3809d6e8e6.1821006915462707298803.jpg'
                },
            ],
        },
        dialogPage: {
            dialogsData: [
                {id: 1, name: 'Me'},
                {id: 2, name: 'Gretta'},
                {id: 3, name: 'Lora Palmer'},
                {id: 4, name: 'Baby'},
                {id: 5, name: 'Lord'},
            ],
            messagesData: [
                {id: '1', message: 'HELLO'},
                {id: '2', message: `'What's news?'`},
                {id: '3', message: 'Nothing much'},
            ],
            newMessageText: '',
        },
        sidebar: {}
    },
    _subscriber() {
        console.log('there is nothing!');
    },
    getState() {
        return this._state;
    },
    subscribe(observer: () => void) {
        this._subscriber = observer;
    },
    onChangeCallback(newPostText: string) {
        this._state.profilePage.newPostText = newPostText;
        this._subscriber();
    },

    dispatch(action) {
        this._state.dialogPage = dialogReducer(this._state.dialogPage, action);
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._subscriber();
    }
}


