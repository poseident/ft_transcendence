import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/lib/components/ui/avatar"
import { Button } from "@/lib/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserDetails } from '../utils/UtilsFetch';
import { useSocket } from '../utils/socketContext';
import { useUser } from "@/lib/components/utils/UserContext";

function UserAv() {
  const { pseudo } = useUser();
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);
  const { socket } = useSocket();

  useEffect(() => {
    console.log('inside nav bar useEffect');
  const fetchData = async () => {
    const userData = await fetchUserDetails();
    setUser(userData);
  };

  fetchData();
}, [pseudo]);

const handleLogout = async () => {
  try {
    const response = await fetch('http://10.13.1.5:3001/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ userId: user[0].id, }),
    });
    if (response.ok) {
      if (socket) {
        socket.disconnect(); // Disconnect the socket
      }
      navigate('/login'); // Redirect to login page after logout
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
        <Avatar className="h-10 w-10">
          {/* Utiliser l'avatar récupéré */}
          <AvatarImage src={user && user[0] ? user[0].avatar || 'placeholder_url' : 'placeholder_url'} alt={pseudo || 'Unknown User'} />

          <AvatarFallback>{pseudo?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user && user[0].pseudo ? user[0].pseudo : 'Unknown User'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/')}>
          Home
        </DropdownMenuItem>
        <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => navigate(`/profile/${user[0].pseudo}`)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/social')}>
            Social
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/settings')}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export function UserNav() {
  return (
    <div className="flex items-start justify-between p-4">
    <div className="ml-auto">
      <UserAv />
    </div>
  </div>
  )
}