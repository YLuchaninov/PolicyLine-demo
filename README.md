# PolicyLine Demo project

For a example of [PolicyLine Library](https://github.com/YLuchaninov/PolicyLine), we implemented a demo project.

There is a blog platform with 3 independent firms:

* **Firm A** is an open company. All the users of the company can publish posts in the blog, all the users of the company can edit them. Unregistered users can view posts of this company.
* **Firm B** is a closed company. Posts can be published and viewed only by the users of the company, edited only by the author of the post, and deleted only by the administrator of the company or by the super-administrator. That is, it's a completely closed company.
* **Firm C** — directly opposite to the first two — is akin to "civic initiative" or "remote journalism". Any user of the company can add a post, but it can be viewed or deleted only by the administrator of the company or by the super-administrator.

This example is quite similar to a sandbox.

You can add new companies with certain rules, which depend not only on roles or on the user. As an example, there's a rule that is responsible for accessing company resources during working hours only. You can add it (usually as a modifier) to any resource or company. Also included are the "age" and "location" fields for the user, and the structure of the post includes "tags," "location," and "category." Therefore, you can try to write rules that restrict certain posts by the age of the user or by the category, or you can share posts only with users within a radius of 100 miles, etc.

*It's all up to you.*


## Installation

> `npm i`

> `docker-compose up --build`

### Helpers

* `docker stop $(docker ps -a -q)` - stop all containers
* `docker rm $(docker ps -a -q)` - remove all containers
* `docker rmi $(docker images -q)` - delete all images


