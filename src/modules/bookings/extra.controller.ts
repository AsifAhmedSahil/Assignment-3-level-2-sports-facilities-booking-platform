const checkAvaiability = catchAsync(async (req, res) => {
    // const date = req.query.date
    let date = req.query.date ? req.query.date : new Date();
    console.log(date,"date 1st")
    const todaysDate = new Date();
    // console.log(todaysDate,"todays date");
  
    if (date.toString() === todaysDate.toString()) {
        const getTodayDate = (): string => {
        const day = todaysDate.getDate().toString().padStart(2, "0");
        const month = (todaysDate.getMonth() + 1).toString().padStart(2, "0");
        const year = todaysDate.getFullYear().toString();
        return `${year}-${month}-${day}`;
      };
  
      const modifiedDate = getTodayDate();
      console.log(modifiedDate,"modifieddate***********")
      date = modifiedDate;
    } 
   
  
    if(!date){
      throw new Error("date is not define")
    }
    
    
    const result = await bookingServices.checkSlots(date as string);
    console.log(result.length)
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: " avaiable slots here",
      data: result,
    });
    
  });



//   previous services code*******************

const checkSlots = async(date:string) =>{
    console.log("check kar",date)
    const avaiableSlots = []

    // define start and end of the day in 24 hr formate: convert minute for match with bookings time 
    const startDay = 0
    const endDay = 24 * 60
    
    

    // convert hr and minute format time to min format
    const hourToMinutes = (time:string) =>{
        const [hour,minute] = time.split(":").map(Number)
        return hour * 60 + minute
    }

    // convert min to hr format 
    const minutesToHours = (minutes :number) => {
        const hours = Math.floor(minutes % 60);
        console.log(hours,"hours")
        // const mins = minutes % 60;
        // console.log(mins,"mins")
        // return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        return `${hours.toString().padStart(2, '0')}:00`;
    };


    const bookingData = await Booking.find({date:date})
    console.log("booking data",bookingData)

    const bookedTimeSlots = bookingData.filter((booking)=> {
        const startTime = hourToMinutes(booking.startTime)
        const endTime =  hourToMinutes(booking.endTime)
        console.log(startTime,endTime)
        return {
            startTime,endTime
        }
    })
    

    // calculate avaiable slots for this day
    let previousEndTime =startDay;
    for(const slot of bookedTimeSlots){
        console.log("check loop",slot.startTime)
        if(parseInt(slot.startTime) > previousEndTime){
            avaiableSlots.push({
                startTime: minutesToHours(previousEndTime),
                endTime: minutesToHours(parseInt(slot.startTime)) 
            })
        }
        
        previousEndTime = parseInt(slot.endTime)
    }
   

    
    

    // check if there are any slots avaiable there after last booking
    if(previousEndTime < endDay){
        avaiableSlots.push({
            startTime: minutesToHours(previousEndTime),
            endTime: minutesToHours(endDay)
        })
    }
    
    return avaiableSlots
}