import "./UserCard.css"
import { User } from '../../misc/types'
import "../../common.css"
import { Button } from "react-bootstrap";
import Picture from "../../assets/Placeholders/UserPicturePlaceholder.png"

interface UserCardProps {
    user: User;
    isAdmin: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, isAdmin }) => {
    return (
        <div className="col-md-6 col-xl-4">
            <div className="card">
                <div className="card-body">
                    <div className="media align-items-center">
                        <img
                            src={user.image ? user.image : Picture}
                            className="avatar avatar-xl mr-3"
                            alt={`${user.name} ${user.surname}`}
                        />
                        <div className="media-body overflow-hidden">
                            <h5 className="card-text mb-0 --bs-success">{user.name} {user.surname}</h5>
                            <p className="card-text text-uppercase text-muted">#{user.id}</p>
                            <p className="card-text">
                                Wage: ${user.wage}<br />
                                {user.isAdmin ? <p>Administrator</p> : <p>Regular Employee</p>}
                            </p>
                        </div>
                    </div>
                    <div className="nobr">
                        <Button href={`/User/Detail/${user.id}`} className="btn btn-sm btn-view ">View</Button>
                        {isAdmin && (
                            <>
                                <Button href={`/User/Edit/${user.id}`} className="btn btn-sm btn-edit btn-warning">Edit</Button>
                                <Button href={`/User/Delete/${user.id}`} className="btn btn-sm btn-delete btn-danger">Delete</Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;