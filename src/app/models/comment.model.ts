/**
 * The comment model
 */
 export interface Comment {
    id: String;
    postId: String;
    name: String;
    email: String; 
    body?:String
} 