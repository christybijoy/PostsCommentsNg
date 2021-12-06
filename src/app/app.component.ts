import { Component, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from './models/user.model';
import { DataService } from './services/data.service';

/**
 * 
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  /**
   * Holds the users list
   */
  public users: User[] = [];
  /**
   * Holds the component data loaded status
   */
  public isLoaded: Boolean = false;
  /**
   * Hold the posts by user
   */
  public posts:any = []  
  /**
   * Hold the clicked user 
   */
  public clickedUser!: User; 
  /**
   * Hold the clicked post 
   */
  public clickedpost!: any; 
  /**
   * hold status to show/hide all post
   */
  public loadAll = false
  /**
   * The destryFlag reference
   */
  private destroyFlag$: Subject<boolean> = new Subject<boolean>();

  /**
   * Initializes an instance and injects dependencies
   * @param dataservice The service reference
   */
  constructor(public dataservice: DataService) { }
  /**
   * ng life-cycle hook
   */
  ngOnInit() { 
    this.fetchUsers(); 
  }
  /**
   * To fetch the users from the REST API
   */
  public fetchUsers() {
    this.isLoaded =false;
    this.dataservice.getUsers().pipe(takeUntil(this.destroyFlag$))
      .subscribe(users => { 
        this.isLoaded = true;
        this.users = users
      }, error => {
        console.log('An error occurred');
        this.isLoaded = true;
      })
  }
  /**
   * To fetch posts by user from REST API
   * @param userId 
   */
  fetchPost(clickedUser:User){
    this.loadAll =false;
    this.clickedUser = clickedUser; 
    this.isLoaded = false;
    this.dataservice.fetchUserPost(this.clickedUser.id).pipe(takeUntil(this.destroyFlag$))
      .subscribe(data => { 
        this.isLoaded = true; 
        this.posts = data
      }, error => {
        console.log('An error occurred');
        this.isLoaded = true;
      })
  }
  /**
   * To fetch comments for the post from REST API
   * @param userId 
   */
   fetchComments(clickedPost:Comment){
    this.clickedpost = clickedPost;
    this.isLoaded = false;
    this.dataservice.fetchComments(this.clickedpost.id).pipe(takeUntil(this.destroyFlag$))
      .subscribe(data => { 
        this.isLoaded = true; 
        this.posts.filter((post:any)=>{
          if(post.id==this.clickedpost.id){
            let postWithComments = post
            postWithComments.comments = data;
            post = postWithComments; 
          }
        })

      }, error => {
        console.log('An error occurred');
        this.isLoaded = true;
      })
  }
  /**
   * To set status for loadAll
   */
  loadAllPosts(){
    this.loadAll = true;
  }
  /**
   * ng life-cycle hook
   */
  ngOnDestroy() {
    this.destroyFlag$.next(true);
    this.destroyFlag$.unsubscribe();
  }
}
