//
//  BorderView.swift
//  SparkTokensDemo
//
//

import Foundation
import SwiftUI
import SparkTokens

struct BorderRow: View {
    var label: String
    var color: Color
    
    var body: some View {
        ZStack {
            HStack {
                VStack(alignment: .leading) {
                    Text(label)
                }.padding(Size.paddingMd)
                Spacer()
            }
            .border(color, width:Size.borderWidthMd)
        }
        .padding(.top, Size.paddingMd)
        .padding(.leading, Size.paddingMd)
        .padding(.trailing, Size.paddingMd)
    }
}

struct BorderView: View {
    var body: some View {
        ZStack {
            ScrollView {
                VStack {
                    // SwiftUI has a maximum of 10 children...
                    Group {
                        BorderRow(label:"Main", color:Color.brandMainMain)
                        BorderRow(label:"Support", color:Color.brandSupportSupport)
                    }
                    
                    Group {
                        BorderRow(label:"Success", color:Color.brandFeedbackSuccess)
                        BorderRow(label:"Alert", color:Color.brandFeedbackAlert)
                        BorderRow(label:"Error", color:Color.brandFeedbackError)
                        BorderRow(label:"Info", color:Color.brandFeedbackInfo)
                        BorderRow(label:"Neutral", color:Color.brandFeedbackNeutral)
                    }
                    
                }
            }
        }
        .navigationBarTitle("Border Colors")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.brandMainOnMain)
//        .edgesIgnoringSafeArea(.all)
    }
}

struct BorderView_Previews: PreviewProvider {
    static var previews: some View {
        BorderView()
    }
}

