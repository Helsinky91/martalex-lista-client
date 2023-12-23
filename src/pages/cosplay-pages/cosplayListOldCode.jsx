<div className="cosplayBoxCard">

                {list.map((eachCosplay) => {
                    if (eachCosplay.choosedBy === undefined) {

                        return (
                            <div key={eachCosplay._id} className="shadow-lg p-3 mb-5 bg-body rounded cosplayCard" >
                                <Link to={`/cosplay/${eachCosplay._id}/details`}><img src={eachCosplay.image} width="150" alt={eachCosplay.name} /></Link>
                                <br />
                                <Link to={`/cosplay/${eachCosplay._id}/details`}>{eachCosplay.name}</Link>
                                <p>{eachCosplay.nameDetails}</p>
                                {/* <hr className="hr-cosplay" /> */}
                                {/* {eachCosplay.name}  </p> */}
                            </div>
                        )
                    } return null
                })}
            </div>
            <div class="cosplayBoxCard">
                {cosplayListToShow.map((eachCosplay) => {
                    return (
                        <div key={eachCosplay._id} class="shadow-lg p-3 mb-5 bg-body rounded recipeCard">
                            <Link to={`/recipes/${eachCosplay._id}/details`}>
                                <img src={eachCosplay.image} alt={eachCosplay.name} width={200} />
                                <p>{eachCosplay.name}</p>
                            </Link>

                        </div>
                    )
                })}



            </div>