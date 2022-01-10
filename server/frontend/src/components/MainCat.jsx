
import React from 'react'

const MainCat = ({ data }) => {

    return (
        <div class="row justify-content-center m-0">

            {data.map(item => {
                return (
                    <div class="card col-lg-3 col-md-5 shadow bg-white m-3" >
                        <img height="200px" src={item.ImgUrl} class="card-img-top" alt="..." width="100%" />
                        <div class="card-body">
                            <h5 class="card-title">{item.title}</h5>
                            <p class="card-text" style={{height:"50px", overflow:"hidden"}}>{item.description} </p>
                            <div class=" d-flex justify-content-between">
                                <div>
                                    <i class="bi bi-calendar-date-fill me-2"></i>
                                    <span>{item.create.split("T")[0].split("-").reverse().join("/")}</span>
                                </div>
                                <a href={`/blog/${item._id}`}>Start Reading  <i class="bi bi-caret-right-fill"></i></a>
                            </div>
                        </div>
                    </div>
                )
            })}


        </div>
    )
}

export default MainCat
