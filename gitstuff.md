```js
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/kelvintony/data_farm.git
git push -u origin main

===> for main branch
git add .
git commit -m"update 1.2"
git push origin main

===> for feature branch
git add .
git commit -m"update 1.44"
git push origin feature-branch

import React from 'react'

===> component sample
const Navbar = () => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar


===> calling context api on a component
import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';

const params = useSearchParams();
const { user, setUser } = useContext(AppContext);

setUser(session);

```
